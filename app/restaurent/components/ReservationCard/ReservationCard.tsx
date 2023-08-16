"use client";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { partySize } from "@/data/partySize";
import { times } from "@/data/times";
import useAvailabilities from "@/hooks/useAvailabilities";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime } from "@/Util/convertDateToDisplayTime";
import { AuthenticationContext } from "@/app/context/AuthContext";
const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: String;
  closeTime: String;
  slug: string;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<any>(openTime);
  const [partysize, setPartysize] = useState<any>(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const { data: userData, loading: userLoad } = useContext(
    AuthenticationContext
  );

  const filterRestaurentByTiming = () => {
    const timesWithInRestaurent: typeof times = [];
    let isWithInTime = false;
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithInTime = true;
      }
      if (isWithInTime) {
        timesWithInRestaurent.push(time);
      }
      if (time.time === closeTime) {
        isWithInTime = false;
      }
    });
    return timesWithInRestaurent;
  };

  const { loading, data, error, fetchAvailability }: any = useAvailabilities();

  const handleChange = (date: Date) => {
    setStartDate(date);
    setDay(date.toISOString().split("T")[0]);
  };

  const handleClick = () => {
    if (!userData){
      fetchAvailability({
        slug,
        day,
        time,
        partysize,
      });
    } else {
      alert("before find the table you need to signin")
    }
    
  };

  return (
    <div className="w-[27%] relative text-reg">
      <div className="w-[100%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="py-3 border-b font-light"
            id=""
            value={partysize}
            onChange={(e: any) => setPartysize(e.target.value)}
          >
            {partySize.map((item: any) => {
              return <option value={item.value}>{item.label}</option>;
            })}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleChange}
              className="w-24 py-2 px-1"
              dateFormat="MMMM dd"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {filterRestaurentByTiming().map((value) => {
                return <option value={value.time}>{value.displayTime}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
          </button>
        </div>
        {data && data.length ? (
          <>
            <div className="mt-4">
              <h1>Select Time</h1>
              <div className="mt-3 flex flex-wrap  py-2 px-3 rounded">
                {data.map((item: any) => {
                  return item.available ? (
                    <Link
                      href={`/reserve/${slug}/?day=${day}&time=${time}&partysize=${partysize}`}
                      className="bg-red-500 cursor-pointer text-center text-white rounded p-2 mb-2 mx-2"
                    >
                      <p>{convertToDisplayTime(item.time)}</p>
                    </Link>
                  ) : (
                    <p className="p-2 mb-3 rounded mr-3 w-24  bg-gray-400"></p>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
