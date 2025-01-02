"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

export type NestedArray<T> = T | Array<NestedArray<T>>;

function flattenArray<T>(arr: NestedArray<T>[], depth: number = 1): Array<T> {
  if (depth === 0) {
    return arr as T[];
  }
  const result: T[] = [];
  arr.forEach((ele) => {
    if (!Array.isArray(ele)) {
      result.push(ele);
    } else {
      const flattened = flattenArray(ele, depth - 1);
      console.log("flattt", flattened);
      result.push(...flattened);
    }
  });
  return result;
}

export default function FlattenArray() {
  const { logText, write } = useWrite<number[]>();

  // const arr2 = [];
  useEffect(() => {
    const arr1 = [1, [2, 3], [[4], [5, [6]]]];
    const flatt = flattenArray(arr1, 1);
    write(flatt);
  }, []);
  return (
    <>
      <Title title="Flatten Arrays" />
      <div>
        <div>Array - {"[1, [2, 3], [[4], [5, [6]]]]"}</div>
        <span>Result - </span>
        {logText.map((entry, index) => (
          <p key={index}>{JSON.stringify(entry)}</p>
        ))}
      </div>
    </>
  );
}
