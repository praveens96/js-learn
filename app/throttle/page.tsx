"use client";

import { useCallback, useEffect, useRef } from "react";

let prevDate = Date.now();

const useThrottling = (mainFn: (arg: unknown[]) => void, delay: number) => {
  const timerFlag = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: unknown[]) => {
      if (timerFlag.current === null) {
        mainFn(...args);
        timerFlag.current = setTimeout(() => {
          timerFlag.current = null;
        }, delay);
      }
    },
    [delay, mainFn]
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const someFn = (_arg: unknown[]) => {
  console.log(
    `some func to be called with throttle ${Date.now() - prevDate}ms`
  );
  prevDate = Date.now();
};
export default function Throttle() {
  const Throttled = useThrottling(someFn, 500);
  useEffect(() => {
    document.addEventListener("mousemove", Throttled);
    return () => document.removeEventListener("mousemove", Throttled);
  }, [Throttled]);

  return <p>Throttle example</p>;
}
