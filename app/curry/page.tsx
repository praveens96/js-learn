"use client";

import { useCallback, useRef } from "react";
import { Loglist } from "../components/Loglist";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

const curry = <T extends unknown[]>(mainFn: (...args: T) => any) => {
  return function curried(...args: unknown[]) {
    if (args.length >= mainFn.length) {
      console.log("in if", args);
      return mainFn(...(args as T));
    } else {
      console.log("in else", args);
      return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
    }
  };
};

const totalNum = (a: number, b: number, c: number, d: number) => {
  return a + b + c + d;
};

const curriedTotal = curry(totalNum);

export default function Curry() {
  const { logText, write } = useWrite();
  const countRef = useRef(0); // Use a ref to maintain count across renders

  // Memoize the logger function
  const log = useCallback(() => {
    write(
      `output for input ${countRef.current++} is ${curriedTotal(10)(20)(30)(
        40
      )}`
    );
  }, [write]);

  const getStandardLogger = useCallback(
    (importance: string, date: Date, message: string) => {
      write(
        `${importance} Log on Day ${date.toDateString()} message - ${message}`
      );
    },
    [write]
  );

  const curriedLog = curry(getStandardLogger);

  const severeLog = curriedLog("Severe");
  const infoLog = curriedLog("Info");

  // Log the results
  log(); // Call the log function
  severeLog(new Date(), "This is a severe log");
  infoLog(new Date(), "This is an info log");

  return (
    <div>
      <Title title="Currying" />
      <Loglist list={logText} />
    </div>
  );
}
