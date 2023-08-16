"use client";

import Image from "next/image";
import errorImg from "../../public/icons/error.png";

export default function Error() {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImg} alt="ErrorImg" className="w-56" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h1 className="text-xl font-bold text-center">Sorry Error Occured!</h1>
        <p className="text-center">Staus code:400</p>
      </div>
    </div>
  );
}
