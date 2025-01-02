"use client";

import { useState } from "react";

export default function useWrite<T = string>() {
  const [logText, setLogText] = useState<T[]>([]);
  const write = (value: T) => {
    setLogText((prevLogs) => [...prevLogs, value]);
  };

  return {
    logText,
    write,
  };
}
