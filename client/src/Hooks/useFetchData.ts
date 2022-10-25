import { useEffect, useState } from "react";

export function useFetchData(url: string) {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setResponse(jsonData);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(url);
  }, [url]);
  return [response, isLoading];
}
