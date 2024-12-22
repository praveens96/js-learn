const curry = <T extends unknown[]>(mainFn: (...args: T) => any) => {
  return function curried(...args: unknown[]) {
    if (args.length >= mainFn.length) {
      console.log("in if", args);
      return mainFn(...(args as T));
    } else {
      console.log("in else", args);
      return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
    }
  };
};

const totalNum = (a: number, b: number, c: number, d: number) => {
  return a + b + c + d;
};

const curriedTotal = curry(totalNum);

const getSimpleLogger = () => {
  let count: number = 0;
  return (value: number) => {
    console.log(`output for input ${count++} is`, value);
  };
};

const log = getSimpleLogger();

const getStandardLogger = (importance, date, message) => {
  console.log(`${importance} Log on Day ${date} message - ${message}`);
};

const curriedLog = curry(getStandardLogger);

const severeLog = curriedLog("Severe");
const infoLog = curriedLog("info");

export default function Curry() {
  log(curriedTotal(10)(20)(30)(40));
  log(curriedTotal(10, 20)(30)(40));
  log(curriedTotal(10, 20)(30, 40));
  severeLog(new Date(), "This is a severe log");
  infoLog(new Date(), "This is an info log");
  return (
    <div>
      <p>currying</p>
    </div>
  );
}
