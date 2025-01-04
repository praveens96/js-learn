"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

function wrap<T>(arr: Array<T>) {
  return new Proxy(arr, {
    get: function (target, property) {
      if (property === "toString") {
        return () => `[${target.join(",")}]`;
      }
      let index = Number(property);
      if (index < 0) {
        index += target.length;
      }
      return target[index];
    },
    set: function (target, property, value) {
      let index = Number(property);
      if (index < 0) {
        index += target.length;
      }
      target[index] = value;
      return true;
    },
  });
}

export default function NegativeIndex() {
  const { logText, write } = useWrite();
  useEffect(() => {
    let a1 = [1, 2, 3];
    a1 = wrap(a1);
    a1[-1] = 5;
    console.log(a1);
    a1[0] = 0;
    write(a1.toString());
  }, [wrap]);
  return (
    <>
      <Title title="Negative indexed array" />
      <div>
        <div>input [1, 2, 3], index -1 to 5 & set 0 index value to 0</div>
        <div>output {logText}</div>
      </div>
    </>
  );
}
