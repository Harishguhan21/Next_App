import {
  convertToDisplayTime,
  formatDate,
} from "@/Util/convertDateToDisplayTime";
import React from "react";
import { Time } from "@/Util/convertDateToDisplayTime";

const Header = ({
  resTitle,
  resImage,
  date,
  time,
  partySize,
}: {
  resTitle: string;
  resImage: string;
  date: string;
  time: Time;
  partySize: string;
}) => {
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={resImage} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{resTitle}</h1>
          <div className="flex mt-3">
            {/* <p className="mr-6">Tues, 22, 2023</p> */}

            <p className="mr-6">{formatDate(date)}</p>
            <p className="mr-6">{convertToDisplayTime(time)}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
