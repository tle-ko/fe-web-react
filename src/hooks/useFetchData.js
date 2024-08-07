import { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  baseURL: "http://otoeic.timelimitexceeded.kr",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  }
});

export default function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(url);
        setData(response.data.results);
        console.log(response.data.results);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}