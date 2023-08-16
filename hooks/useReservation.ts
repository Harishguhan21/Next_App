import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export interface reserveValue {
  bookerFirstName: string;
  bookerLastName: string;
  bookerPhone: string;
  email: string;
  bookerOccusion: string;
  bookerRequest: string;
}

export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const reserveTable = async (
    {
      slug,
      day,
      time,
      partySize,
    }: {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    },
    values: reserveValue,
    setDidBook: Dispatch<SetStateAction<boolean>>
  ) => {
    console.log(values, slug, day, time, partySize);
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/restaurent/${slug}/reserve`,
        values,
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
      setDidBook(true);
    } catch (error: any) {
      setError(error);
    }
  };

  return { reserveTable, loading, error, data };
};
