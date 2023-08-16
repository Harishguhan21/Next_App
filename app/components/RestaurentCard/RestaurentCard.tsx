import { RestaurentType } from "@/app/page";
import Link from "next/link";
import React from "react";
import Pricing from "../Pricing/Pricing";
import Stars from "../Stars/Stars";

export interface Props {
  restaurentDetails: RestaurentType;
}

const RestaurentCard = ({ restaurentDetails }: Props | any) => {
  return (
    <Link href={`/restaurent/${restaurentDetails.slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
        <img
          src={restaurentDetails.main_image}
          alt=""
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurentDetails.name}</h3>
          <div className="flex items-center">
            <Stars ratingValue={restaurentDetails.reviews.length} />
            {restaurentDetails.reviews.length > 0 ? (
              <p className="ml-2">{restaurentDetails.reviews.length} reviews</p>
            ) : (
              <p className="ml-2"> No reviews</p>
            )}
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurentDetails.cusine.name}</p>
            <Pricing price={restaurentDetails.price} />
            <p>{restaurentDetails.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurentCard;
