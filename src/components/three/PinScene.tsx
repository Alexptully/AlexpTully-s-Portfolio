"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BoxGeometry,
  CanvasTexture,
  CylinderGeometry,
  MathUtils,
  Object3D,
  SRGBColorSpace,
  Vector3,
  type Group,
  type InstancedMesh,
  type MeshStandardMaterial,
  type PointLight,
  type Sprite,
  type SpriteMaterial,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { PinInput } from "./PinCanvas";

/**
 * The AntiCam clip-on pin (design-spec §10.1): the site's one WebGL scene. The pointer is the
 * camera. As it nears the centre of the pin the nine emitters brighten, pink spills onto the
 * plate and rim, a screen-space glare blooms over the array and the key light dims, the way
 * a sensor's auto-exposure fails in front of the array. Matte materials, dim room light, a
 * long lens: product photography in a dark room, so the pink reads as emitted light.
 *
 * Client-only. Import through `PinCanvas` (`next/dynamic`, `ssr: false`), never directly
 * from a Server Component. Every ref is touched only inside effects or `useFrame`.
 */

export type PinSceneProps = {
  /** Shared, mutable pointer state written by `PinCanvas`'s handlers and read per frame. */
  input: PinInput;
  /** User pause, off screen or hidden tab: nothing changes per frame, one frame stays drawn. */
  paused: boolean;
  /** No drift, no tilt, no self-driven frames; pointer input still updates the light. */
  reduceMotion: boolean;
  /** The first frame has been drawn; the wrapper can fade the canvas in over the poster. */
  onReady: () => void;
  /** The first three frame gaps each exceeded 24 ms; the wrapper should keep the poster. */
  onSlow: () => void;
  /** WebGL is unavailable, so no canvas is mounted; the wrapper keeps the poster. */
  onError: () => void;
  className?: string;
};

// §2.2 canvas material tokens. A WebGL material cannot read a CSS custom property, so the
// hex anchors are repeated here; `globals.css` holds the same values.
const PIN_BODY = "#1C2230"; // --pin-body
const PIN_RIM = "#0E1014"; // --pin-rim
const PLATE_LIGHT = "#E6E7E9"; // --plate-light
const LED_MODULE = "#D9D6CC"; // --led-module
const EMITTER_OFF = "#3A0F1C"; // --emitter-off
const ACCENT = "#FF3B6F"; // --accent, the IR pink as a light

// Units: 1 = the pin's 42 mm width.
const PLANE_Z = 0.2; // the plane the pointer is projected onto (the emitter face)
const EMITTER_PITCH = 0.085;
const EMITTER_Z = 0.205;
const EMITTER_COUNT = 9;

// The per-frame law (§10.1).
const K_FAR = 1.2; // distance at which the camera stops mattering
const K_NEAR = 0.15; // distance at which the array is fully washed out
const REST_K_REDUCED = 0.6; // the single lit frame under reduced motion
const DAMP = 6;
const DAMP_KEY = 4;
const MAX_DT = 1 / 30; // a long gap between demand frames still eases instead of snapping

/**
 * The key is a point light, not the table's directional light: a directional light lights a
 * flat face uniformly, and the plate and the navy face then read as flat fills. A point light
 * close to the pin gives them the falloff of a softbox, which is what makes the object read as
 * photographed. Its spec intensity (1.2 → 0.7 with exposure compensation) is scaled by
 * `KEY_SCALE` for the inverse-square falloff at this distance.
 */
const KEY_POSITION: [number, number, number] = [-1.0, 1.25, 3.0];
const KEY_SCALE = 17;
const HEMI_INTENSITY = 1.4;

const IDLE_MS = 3000; // drift takes over this long after the last input
/*
 * Low-end guard (§10.1). The first frames after mount are always slow — shader compile,
 * geometry upload, the first paint of a canvas that is larger on a desktop than on a phone —
 * so measuring them measured the warm-up, not the device, and tripped the guard on ordinary
 * desktops. That left the poster and, with it, no Pause control, while the same machine at a
 * phone width ran the scene. The guard now skips the warm-up and measures the frames after it.
 */
const GUARD_WARMUP = 8; // frames drawn before any measurement
const GUARD_FRAMES = 6; // frame gaps measured after the warm-up
const GUARD_MS = 34;

/**
 * R3F configures the renderer asynchronously, so a failed context creation surfaces as an
 * unhandled rejection rather than a render error the boundary could catch. Probe first.
 */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** smoothstep from `K_FAR` (0) down to `K_NEAR` (1). */
function washout(distance: number): number {
  const t = MathUtils.clamp((K_FAR - distance) / (K_FAR - K_NEAR), 0, 1);
  return t * t * (3 - 2 * t);
}

/** 256² radial pink, opaque at the centre and transparent at the edge, for the glare sprite. */
function makeGlareTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    // A hot core with a long, soft tail: the shape a bloomed sensor records.
    gradient.addColorStop(0, "rgba(255,226,234,1)");
    gradient.addColorStop(0.07, "rgba(255,120,160,0.9)");
    gradient.addColorStop(0.2, "rgba(255,59,111,0.62)");
    gradient.addColorStop(0.42, "rgba(255,59,111,0.24)");
    gradient.addColorStop(0.7, "rgba(255,59,111,0.07)");
    gradient.addColorStop(1, "rgba(255,59,111,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Lays the 3×3 array out once, flat faces towards the camera. */
function writeEmitterMatrices(mesh: InstancedMesh, dummy: Object3D) {
  let i = 0;
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      dummy.position.set(col * EMITTER_PITCH, row * EMITTER_PITCH, EMITTER_Z);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i++, dummy.matrix);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
}

type Sim = {
  k: number;
  key: number;
  rotX: number;
  rotY: number;
  frame: number;
  lastT: number;
  slowFrames: number;
  t0: number;
};

type PinProps = Omit<PinSceneProps, "className" | "onError">;

function Pin({ input, paused, reduceMotion, onReady, onSlow }: PinProps) {
  const group = useRef<Group>(null);
  const emitters = useRef<InstancedMesh>(null);
  const emitterMaterial = useRef<MeshStandardMaterial>(null);
  const spill = useRef<PointLight>(null);
  const key = useRef<PointLight>(null);
  const glare = useRef<Sprite>(null);
  const glareMaterial = useRef<SpriteMaterial>(null);
  const invalidate = useThree((state) => state.invalidate);

  const geometry = useMemo(
    () => ({
      body: new RoundedBoxGeometry(1.0, 1.0, 0.28, 6, 0.12),
      rim: new RoundedBoxGeometry(1.06, 1.06, 0.1, 6, 0.14),
      plate: new RoundedBoxGeometry(0.78, 0.78, 0.04, 4, 0.06),
      module: new BoxGeometry(0.3, 0.3, 0.02),
      well: new BoxGeometry(0.258, 0.258, 0.006),
      emitter: new CylinderGeometry(0.028, 0.028, 0.012, 12),
    }),
    [],
  );
  const glareTexture = useMemo(() => makeGlareTexture(), []);
  const dummy = useMemo(() => new Object3D(), []);
  const scratch = useMemo(() => ({ point: new Vector3(), dir: new Vector3() }), []);
  // Starts in the lit state the poster draws, so the cross-fade does not jump.
  const sim = useRef<Sim>({
    k: REST_K_REDUCED,
    key: 1.2 - 0.5 * REST_K_REDUCED,
    rotX: 0,
    rotY: 0,
    frame: 0,
    lastT: -1,
    slowFrames: 0,
    t0: -1,
  });

  // Imperative objects own GPU memory; R3F only disposes what it created declaratively.
  useEffect(
    () => () => {
      for (const g of Object.values(geometry)) g.dispose();
      glareTexture.dispose();
    },
    [geometry, glareTexture],
  );

  useLayoutEffect(() => {
    if (emitters.current) writeEmitterMatrices(emitters.current, dummy);
  }, [dummy]);

  // Any input draws a frame now, and one more after the idle window so drift can take over
  // without a running loop in between.
  useEffect(() => {
    let timer: number | undefined;
    input.setListener(() => {
      invalidate();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => invalidate(), IDLE_MS + 50);
    });
    return () => {
      input.setListener(null);
      window.clearTimeout(timer);
    };
  }, [input, invalidate]);

  // A pause toggle or a preference change draws one frame in the new state.
  useEffect(() => {
    invalidate();
  }, [paused, reduceMotion, invalidate]);

  useFrame((state, rawDelta) => {
    const s = sim.current;
    if (paused) {
      s.lastT = -1;
      return;
    }
    const now = performance.now();
    if (s.t0 < 0) s.t0 = now;

    // First frame drawn, then the low-end guard over the frame gaps after the warm-up.
    if (s.frame === 0) onReady();
    const guardEnd = GUARD_WARMUP + GUARD_FRAMES;
    let measuring = false;
    if (s.frame <= guardEnd) {
      if (s.lastT >= 0 && s.frame > GUARD_WARMUP) {
        if (now - s.lastT > GUARD_MS) s.slowFrames += 1;
        if (s.frame === guardEnd && s.slowFrames === GUARD_FRAMES) onSlow();
      }
      measuring = s.frame < guardEnd;
      s.frame += 1;
    }

    const dt = Math.min(rawDelta, MAX_DT);
    const idle = now - input.lastInputAt > IDLE_MS;
    let drifting = false;
    let px = 0;
    let py = 0;
    let hasCamera = true;
    if (input.hover) {
      px = input.x;
      py = input.y;
    } else if (input.source === "virtual" && (reduceMotion || !idle)) {
      px = input.vx;
      py = input.vy;
    } else if (!reduceMotion && idle) {
      const tau = (now - s.t0) / 1000;
      px = 0.6 * Math.sin(tau / 1.4);
      py = 0.4 * Math.sin(tau / 2.3);
      drifting = true;
    } else {
      hasCamera = false;
    }

    let kTarget = reduceMotion ? REST_K_REDUCED : 0;
    let tiltX = 0;
    let tiltY = 0;
    if (hasCamera) {
      // Unproject the pointer to the emitter plane; its distance from the pin's centre is
      // how close the camera is.
      const cam = state.camera;
      scratch.point.set(px, py, 0.5).unproject(cam);
      scratch.dir.copy(scratch.point).sub(cam.position).normalize();
      const t = (PLANE_Z - cam.position.z) / scratch.dir.z;
      const wx = cam.position.x + scratch.dir.x * t;
      const wy = cam.position.y + scratch.dir.y * t;
      kTarget = washout(Math.hypot(wx, wy));
      if (!reduceMotion) {
        tiltY = px * 0.22;
        tiltX = -py * 0.16;
      }
    }
    const keyTarget = 1.2 - 0.5 * kTarget;

    s.k = MathUtils.damp(s.k, kTarget, DAMP, dt);
    s.key = MathUtils.damp(s.key, keyTarget, DAMP_KEY, dt);
    s.rotX = MathUtils.damp(s.rotX, tiltX, DAMP, dt);
    s.rotY = MathUtils.damp(s.rotY, tiltY, DAMP, dt);

    const k = s.k;
    if (emitterMaterial.current) emitterMaterial.current.emissiveIntensity = 0.5 + 2.2 * k;
    if (spill.current) spill.current.intensity = 0.2 + 1.6 * k;
    if (glare.current) {
      const scale = 0.4 + 1.6 * k;
      glare.current.scale.set(scale, scale, 1);
    }
    if (glareMaterial.current) glareMaterial.current.opacity = 0.15 + 0.7 * k;
    if (key.current) key.current.intensity = s.key * KEY_SCALE;
    if (group.current) group.current.rotation.set(s.rotX, s.rotY, 0);

    const settled =
      Math.abs(s.k - kTarget) < 0.001 &&
      Math.abs(s.key - keyTarget) < 0.001 &&
      Math.abs(s.rotX - tiltX) < 0.0002 &&
      Math.abs(s.rotY - tiltY) < 0.0002;
    // Frames drive themselves only while something is still easing or drifting (and while
    // the guard measures); under reduced motion nothing moves on its own.
    if (measuring || (!reduceMotion && (drifting || !settled))) state.invalidate();
    s.lastT = now;
  });

  return (
    <>
      <hemisphereLight color="#C9D3E0" groundColor="#0B0E13" intensity={HEMI_INTENSITY} />
      <pointLight
        ref={key}
        color="#FFF4E6"
        intensity={(1.2 - 0.5 * REST_K_REDUCED) * KEY_SCALE}
        decay={2}
        position={KEY_POSITION}
      />
      <group ref={group}>
        {/* The rim sits behind the body's front face: a solid 1.06 box at z 0.12 would cover the
            navy face entirely, so it is set back to z 0.02 and reads as the black border the
            poster draws. */}
        <mesh geometry={geometry.rim} position={[0, 0, 0.02]}>
          <meshStandardMaterial color={PIN_RIM} roughness={0.9} metalness={0} />
        </mesh>
        <mesh geometry={geometry.body} position={[0, 0, 0]}>
          <meshStandardMaterial color={PIN_BODY} roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh geometry={geometry.plate} position={[0, 0, 0.16]}>
          <meshStandardMaterial color={PLATE_LIGHT} roughness={0.55} metalness={0} />
        </mesh>
        <mesh geometry={geometry.module} position={[0, 0, 0.19]}>
          <meshStandardMaterial color={LED_MODULE} roughness={0.4} metalness={0} />
        </mesh>
        {/* The dark well the emitters sit in, as the poster draws it. */}
        <mesh geometry={geometry.well} position={[0, 0, 0.202]}>
          <meshStandardMaterial color={EMITTER_OFF} roughness={0.6} metalness={0} />
        </mesh>
        {/* One draw call for the nine emitters; the bounding sphere ignores instance
            transforms, so culling is off. */}
        <instancedMesh
          ref={emitters}
          args={[geometry.emitter, undefined, EMITTER_COUNT]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            ref={emitterMaterial}
            color={EMITTER_OFF}
            emissive={ACCENT}
            emissiveIntensity={0.5 + 2.2 * REST_K_REDUCED}
            roughness={0.5}
            toneMapped={false}
          />
        </instancedMesh>
        {/* The pink the array throws back onto the plate and the rim. */}
        <pointLight
          ref={spill}
          color={ACCENT}
          intensity={0.2 + 1.6 * REST_K_REDUCED}
          distance={2.5}
          decay={2}
          position={[0, 0, 0.45]}
        />
        {/* The bloom a sensor records over the array: screen-space, additive. */}
        <sprite ref={glare} position={[0, 0, 0.25]} scale={[1.36, 1.36, 1]}>
          <spriteMaterial
            ref={glareMaterial}
            map={glareTexture}
            transparent
            opacity={0.15 + 0.7 * REST_K_REDUCED}
            blending={AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      </group>
    </>
  );
}

export default function PinScene({ className, onError, ...pin }: PinSceneProps) {
  const [supported] = useState(() => supportsWebGL());

  useEffect(() => {
    if (!supported) onError();
  }, [supported, onError]);

  if (!supported) return null;

  return (
    <Canvas
      className={className}
      // 1.5× is enough for matte surfaces and a soft glare; it halves the fill cost on 3× phones.
      dpr={[1, 1.5]}
      // Frames are drawn only on input, on drift ticks and while values ease; idle GPU cost is zero.
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // 21°, not 30: the object fills about seven tenths of the box instead of a third, and
      // the poster's own geometry table is scaled to match, so the cross-fade does not jump.
      camera={{ fov: 21, position: [0, 0, 4.2], near: 0.1, far: 20 }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
      }}
    >
      <Pin {...pin} />
    </Canvas>
  );
}
