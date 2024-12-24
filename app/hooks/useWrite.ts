"use client";

import { useState } from "react";

export default function useWrite() {
  const [logText, setLogText] = useState<string[]>([]);
  const write = (value: unknown) => {
    setLogText((prevLogs) => [...prevLogs, String(value)]);
  };

  return {
    logText,
    write,
  };
}
