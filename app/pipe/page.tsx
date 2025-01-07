"use client";

import { useEffect } from "react";
import Title from "../components/Title";
import useWrite from "../hooks/useWrite";

type PipeFn<T, R> = (arg: T) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pipe<T>(...funcs: PipeFn<any, any>[]): (arg: T) => any {
  return function (initialArgs) {
    // Impl - 1
    // let result = initialArgs;
    // for (const fn of funcs) {
    //   result = fn(result);
    // }
    // return result;
    // impl - 2
    // return funcs.reduce((acc, fn) => fn(acc), initialArgs);
    //impl - 3
    return funcs.reduce(async (chain, fn) => {
      const result = await chain;
      return fn(result);
    }, Promise.resolve(initialArgs));
  };
}

type InType = { name: string };

export default function PipePage() {
  const { logText, write } = useWrite<string>();
  const getName = (input: InType) => input.name;
  const getUpperCaseName = (input: string) => input.toUpperCase();
  const getUpperCaseNameAsync = async (input: string) =>
    Promise.resolve(input.toUpperCase());
  const getFirstName = (input: string) => input.split(" ")[0];
  const getReversedName = (input: string) => {
    return input.split("").reverse().join("");
  };
  const name = "Praveen Seela";
  useEffect(() => {
    pipe<InType>(
      getName,
      getUpperCaseNameAsync,
      getFirstName,
      getReversedName
    )({ name }).then((res: string) => write(res));
  }, []);

  return (
    <>
      <Title title="Pipe Own implementation" />
      <div>
        <div>input: {name}</div>
        <div>output:{logText}</div>
      </div>
    </>
  );
}
