import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * The one place GSAP plugins are registered. Every motion primitive imports gsap from here, so
 * ScrollTrigger, SplitText and useGSAP are registered exactly once, on the client, before
 * first use. `registerPlugin` is idempotent, and the guard keeps it off the server.
 */
let registered = false;

export function ensureGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

ensureGsapPlugins();

export { gsap, ScrollTrigger, SplitText, useGSAP };
