import { useEffect, useState } from "react";

export const useFetch = (fetcher) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const result = fetcher();
  const fetcherReturnedPromise = result instanceof Promise;

  const fetchData = async () => {
    try {
      const response = await fetcher();
      setData(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (fetcherReturnedPromise) {
      fetchData();
    }
  }, []);

  return { data: fetcherReturnedPromise ? data : result, error };
};
