"use client";

import { useCallback } from "react";

const debounced = (mainFn, delay) => {
  let timer;
  return function (...args) {
    try {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFn(...args);
      }, delay);
    } catch (ex) {
      console.error(ex);
    }
  };
};
const someFn = () => {
  console.log("on click debounce");
};
export default function First() {
  const debouncedFn = useCallback(
    debounced(someFn, 500)
  , [])
  return (
    <div>
      <p>first</p>
      <button
        onClick={() => {
          // console.log("onclik");
          try {
            debouncedFn();
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
