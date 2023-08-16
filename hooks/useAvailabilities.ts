"use client";
import { useState } from "react";
import axios from "axios";
export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchAvailability = async ({
    slug,
    day,
    time,
    partysize,
  }: {
    slug: string;
    day: string;
    time: string;
    partysize: string;
  }) => {
    const partySize = partysize;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurent/${slug}/availability`,

        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return { fetchAvailability, data, loading, error };
}
