"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

export interface NestedObject {
  [key: string]: NestedObject | object[] | number | string | boolean | null;
}
function flattenObject(obj: NestedObject | object[]): Record<string, unknown> {
  let result: Record<string, unknown> = {};
  for (const key in obj) {
    const value = (obj as NestedObject)[key];
    if (typeof value === "object" && value !== null) {
      result = { ...result, ...flattenObject(value) };
    } else {
      result[key] = value;
    }
  }
  console.log(result);
  return result;
}

function flattenWithPrefix(
  input: NestedObject | object[],
  prefix = ""
): Record<string, unknown> {
  let result: Record<string, unknown> = {};
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = (input as NestedObject)[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        result = { ...result, ...flattenWithPrefix(value, newKey) };
      } else {
        result[newKey] = value;
      }
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

    const prefixRes = flattenWithPrefix(obj);
    write(prefixRes);
  }, []);

  return (
    <div>
      <Title title="Flatten Object & With Prefix" />
      {logText.map((line, index) => (
        <div key={index}>{JSON.stringify(line)}</div>
      ))}
    </div>
  );
}
