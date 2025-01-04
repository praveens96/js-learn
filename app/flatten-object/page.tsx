"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

export interface NestedObject {
  [key: string]: NestedObject | object[] | number | string | boolean | null;
}

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
