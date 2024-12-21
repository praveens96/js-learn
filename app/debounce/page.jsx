"use client";

import { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";

const useDebounced = (mainFn, delay) => {
  const timer = useRef();
  const callCount = useRef(0);

  const debouncedFn = useCallback((...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      mainFn(...args, ++callCount.current);
    }, delay);
  });
  return debouncedFn;
};

const someFn = (count, callCount) => {
  console.log("on click debounce", count, callCount);
};

export default function First() {
  const [state, setState] = useState(0);
  const debouncedFn = useDebounced(someFn, 500);

  return (
    <div>
      <p>first</p>
      <button
        onClick={() => {
          // console.log("onclik");
          setState((state) => state + 1);
          try {
            debouncedFn(state);
          } catch (error) {
            console.error("onclick err", error);
          }
        }}
        style={{
          border: "1px solid gray",
          padding: "2px",
        }}
      >
        submit
      </button>
    </div>
  );
}
