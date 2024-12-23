"use client";

const join = (a: string, b: string, c: string) => {
  return `${a}_${b}_${c}`;
};

const placeholder = "_";

const curryWithPlaceholder = (mainFn) => {
  return function curried(...args: unknown[]) {
    const hasRequiredArgs = args.length >= mainFn.length;
    const hasPlaceholder = args.includes(placeholder);

    if (hasRequiredArgs && !hasPlaceholder) {
      return mainFn(...args);
    } else {
      return (...nextArgs: unknown[]) => {
        // console.log("nextArgs", nextArgs);

        const processedArgs = args
          .map((arg) => {
            //   console.log("arg in map", arg);
            if (arg === placeholder && nextArgs.length > 0) {
              return nextArgs.shift();
            } else if (arg !== placeholder) {
              return arg;
            }
          })
          .map((x) => x);

        const mergedArgs = [...processedArgs, ...nextArgs];
        console.log("mergedArgs", ...mergedArgs);
        return curried(...mergedArgs);
      };
    }
  };
};

const getLogger = () => {
  return function (value) {
    console.log(value);
  };
};

const log = getLogger();

const curriedJoin = curryWithPlaceholder(join);

export default function CurryWithPlaceholder() {
  console.log("curried", curriedJoin("_")("a")("_")("b")("_")("c"));
  //   log(curriedJoin("a")("_")("b"));
  return <>Currying with Placeholder</>;
}
