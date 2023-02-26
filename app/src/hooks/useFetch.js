import { useEffect, useState } from 'react';

export default function useFetch(url, token) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const resp = fetch(
          url,
          token
            ? {
                headers: { Authorization: `Bearer ${token}` },
              }
            : {},
        );
        const _data = await resp.json();
        setData(_data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
}
