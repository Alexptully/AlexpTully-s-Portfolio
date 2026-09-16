"use client";

import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export type LabSceneProps = {
  /** Stops the frameloop and every animation: reduced motion, off-screen, hidden tab, user pause. */
  paused?: boolean;
  /** Pointer parallax on the whole rig. Off for reduced motion. */
  parallax?: boolean;
  /** Applied to the div that wraps the <canvas>. */
  className?: string;
};

// AntiCam deck accent.
const IR_PINK = "#FF3B6F";

// 12 x 12 "IR LEDs" on a gently curved plate.
const GRID = 12;
const PITCH = 0.2;
const COUNT = GRID * GRID;
const CURVE = 0.06;

type Cell = readonly [x: number, y: number, z: number];

function buildCells(): Cell[] {
  const half = (GRID - 1) / 2;
  const cells: Cell[] = [];
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const x = (i - half) * PITCH;
      const y = (j - half) * PITCH;
      cells.push([x, y, -CURVE * x * x]);
    }
  }
  return cells;
}

/** Writes one instance matrix per LED. A travelling wave scales each LED between 0.65x and 1.35x. */
function writeMatrices(
  mesh: THREE.InstancedMesh,
  cells: Cell[],
  dummy: THREE.Object3D,
  t: number,
) {
  for (let i = 0; i < cells.length; i++) {
    const [x, y, z] = cells[i];
    const wave = 0.5 + 0.5 * Math.sin(t * 2.4 - (x + y) * 2.2);
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(0.65 + wave * 0.7);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function IrLedArray({ paused }: { paused: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cells = useMemo(() => buildCells(), []);

  // First frame: lay the grid out before paint so a paused scene still shows the array.
  useLayoutEffect(() => {
    if (mesh.current) writeMatrices(mesh.current, cells, dummy, 0);
  }, [cells, dummy]);

  // useFrame only runs while the Canvas frameloop is "always" (see LabScene below),
  // so a paused scene costs nothing per frame.
  useFrame(({ clock }) => {
    if (paused || !mesh.current) return;
    writeMatrices(mesh.current, cells, dummy, clock.elapsedTime);
  });

  const plate = GRID * PITCH + 0.3;

  return (
    <group>
      {/* one draw call for all 144 LEDs; geometry and material are disposed by R3F on unmount */}
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshStandardMaterial
          color="#3a0d18"
          emissive={IR_PINK}
          emissiveIntensity={1.8}
          roughness={0.4}
          toneMapped={false}
        />
      </instancedMesh>
      <mesh position={[0, 0, -0.14]}>
        <boxGeometry args={[plate, plate, 0.06]} />
        <meshStandardMaterial color="#14141a" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Glass lens in front of the array: MeshPhysicalMaterial transmission refracts the LEDs behind it. */
function Lens({ paused }: { paused: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (paused || !ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.25;
  });

  return (
    <group ref={ref} position={[0, 0, 1.1]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.16, 64]} />
        <meshPhysicalMaterial
          color="#cfe9ff"
          transmission={0.95}
          thickness={0.8}
          roughness={0.08}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationColor="#9cc9ff"
          attenuationDistance={2}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[0.8, 0.06, 24, 96]} />
        <meshStandardMaterial color="#1b1b22" metalness={0.9} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** Eases the rig toward the pointer (state.pointer is already normalised to -1..1). */
function ParallaxRig({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    const g = ref.current;
    if (!g) return;
    const targetX = enabled ? -pointer.y * 0.22 : 0;
    const targetY = enabled ? pointer.x * 0.32 : 0;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, delta);
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * Client-only. Import through `LabCanvas` (next/dynamic, ssr:false), never directly
 * from a Server Component.
 */
export default function LabScene({
  paused = false,
  parallax = true,
  className,
}: LabSceneProps) {
  return (
    <Canvas
      className={className}
      // Cap device pixel ratio: 1.5x is visually enough for emissive dots and glass and
      // halves the fill cost on 3x phones compared with the device's native ratio.
      dpr={[1, 1.5]}
      // "demand" renders once on changes and otherwise idles; "always" runs rAF.
      frameloop={paused ? "demand" : "always"}
      // alpha:true gives a transparent clear colour so the page background shows through.
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.2], fov: 38, near: 0.1, far: 40 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#6ea8ff" />
      <pointLight position={[0, 0, 1.6]} color={IR_PINK} intensity={8} distance={7} decay={2} />

      <ParallaxRig enabled={parallax && !paused}>
        <Float
          enabled={!paused}
          speed={1.1}
          rotationIntensity={0.3}
          floatIntensity={0.6}
          floatingRange={[-0.08, 0.08]}
        >
          <group rotation={[0.12, -0.3, 0]}>
            <IrLedArray paused={paused} />
            <Lens paused={paused} />
          </group>
        </Float>
      </ParallaxRig>
    </Canvas>
  );
}
