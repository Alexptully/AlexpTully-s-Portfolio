"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** What to render once the scene has thrown. `null` leaves whatever sits underneath. */
  fallback?: ReactNode;
  /** Called once, on the first error. */
  onError?: () => void;
};

type State = { failed: boolean };

/**
 * WebGL context creation (no WebGL, blocked GPU, a lost context) throws inside R3F's
 * `Canvas`. This boundary swallows it so the poster underneath stays and the page keeps
 * working (design-spec §10.1). It is a class because React still has no hook for error
 * boundaries.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

export default SceneErrorBoundary;
