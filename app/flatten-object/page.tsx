"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

export interface NestedObject {
  [key: string]: NestedObject | object[] | number | string | boolean | null;
}
// function flattenObject(obj: NestedObject | object[]): Record<string, unknown> {
//   const result: Record<string, unknown> = {};
//   for (const key in obj) {
//     const value = (obj as NestedObject)[key];
//     if (typeof value === "object" && value !== null) {
//       result[key] = flattenObject(value);
//     } else {
//       result[key] = value;
//     }
//   }
//   console.log(result);
//   return result;
// }

export function flattenObject(
  obj: Record<string, any>,
  parentKey = "",
  result: Record<string, any> = {}
): Record<string, any> {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result); // Recursively flatten nested objects
    } else {
      result[newKey] = obj[key]; // Assign primitive values
    }
  }
  return result;
}

export default function FlattenObject() {
  const { logText, write } = useWrite<object>();
  useEffect(() => {
    const obj = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
        e: 3,
      },
    };
    const res = flattenObject(obj);
    console.log(res);
    write(res);
  }, []);
  return (
    <div>
      <Title title="Flatten Object" />
      {logText.map((line, index) => (
        <span key={index}>{JSON.stringify(line)}</span>
      ))}
    </div>
  );
}
