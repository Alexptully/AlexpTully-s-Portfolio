"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

const getTime = () => format.format(new Date());
const getServerTime = () => null;

/**
 * Local time in Los Angeles, where Alex studies from fall 2026. The server renders a dash, so
 * the HTML never carries a stale time and hydration never mismatches.
 */
export function LocalClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
