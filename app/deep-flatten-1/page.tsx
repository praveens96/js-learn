"use client";

import { useCallback, useEffect, useState } from "react";
import Title from "../components/Title";
import { Loglist } from "../components/Loglist";
import useWrite from "../hooks/useWrite";

const arr = [1, [2, 3], [4, 5, [6]]];
const depth = 2;

function flatten(arr: any, depth: number = 1) {
  console.log("in flatten");
  if (depth === 0) {
    return arr;
  }
  const result = [];
  for (const ele of arr) {
    if (!Array.isArray(ele)) {
      result.push(ele);
    } else {
      const flattenedArr = flatten(ele, depth - 1);
      console.log("flattenedArr", flattenedArr);
      result.push(flattenedArr);
    }
  }
  return result;
}
export default function DeepFlatten1() {
  const { logText, write } = useWrite();
  useEffect(() => {
    const res = flatten(arr, depth);
    console.log("res", res);
    write(res);
  }, []);
  return (
    <>
      <Title title="Deep Flatten - 1" />
      <div>Deep flatten upto given depth</div>
      <Loglist list={logText} />
    </>
  );
}
