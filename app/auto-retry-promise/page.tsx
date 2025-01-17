"use client";

import { useCallback, useEffect } from "react";
import Title from "../components/Title";

function fetchWithAutoRetry(fn: () => Promise<unknown>, limit: number) {
  return new Promise((resolve, reject) => {
    (function retryFetch() {
      fn()
        .then((data: unknown) => resolve(data))
        .catch((ex: unknown) => {
          if (limit-- > 0) {
            console.log("limit", limit);
            retryFetch();
          } else {
            console.log("limit b4 reject", limit);
            reject(ex);
          }
        });
    })();
  });
}

export default function AutoRetry() {
  const fetchData = useCallback(() => {
    let count = 0;
    return async () => {
      if (count++ === 4) {
        return Promise.resolve("Successful");
      } else {
        return Promise.reject("rejected");
      }
    };
  }, []);

  useEffect(() => {
    fetchWithAutoRetry(fetchData(), 3)
      .then((r) => console.log("res", r))
      .catch((ex) => console.log("catch", ex));
    fetchWithAutoRetry(fetchData(), 5)
      .then((r) => console.log("res", r))
      .catch((ex) => console.log("catch", ex));
  }, [fetchData]);

  return (
    <>
      <Title title="Auto Retry Promises" />
      <div></div>
    </>
  );
}
