"use client";

import { useCallback, useEffect, useRef } from "react";
import useWrite from "../hooks/useWrite";
import Title from "../components/Title";
import { Loglist } from "../components/Loglist";

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

export default function Throttle() {
  const { logText, write } = useWrite();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const someFn = (_arg: unknown[]) => {
    write(`some func called with throttle ${Date.now() - prevDate}ms`);
    prevDate = Date.now();
  };

  const Throttled = useThrottling(someFn, 500);

  useEffect(() => {
    document.addEventListener("mousemove", Throttled);
    return () => document.removeEventListener("mousemove", Throttled);
  }, [Throttled]);

  return (
    <div>
      <Title title="Throttle Example" />
      <div>
        <h4>Problem: Run a function after a given throttle time</h4>
      </div>
      <div>
        <p>Result:</p>
        <Loglist list={logText} />
      </div>
    </div>
  );
}
