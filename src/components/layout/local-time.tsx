"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: siteConfig.location.timezone,
  hour12: false,
});

/**
 * Live local time where Twana is.
 *
 * A small thing, but it does real work for a remote candidate: it makes the
 * timezone overlap concrete instead of something the reader has to look up.
 *
 * Renders nothing until mounted — the server has no client clock, and a
 * server-rendered time would be both wrong and a hydration mismatch.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();

    // Align the first update to the top of the next minute, then run hourly-safe
    // 60s intervals — avoids a drifting clock without polling every second.
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="tabular-nums">
      {time ? `${time} local` : <span className="opacity-0">00:00 local</span>}
    </span>
  );
}
