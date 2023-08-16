import Stars from "@/app/components/Stars/Stars";
import { Review } from "@prisma/client";
import React from "react";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      {reviews.length > 0 ? (
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {reviews.length} people are saying
        </h1>
      ) : (
        <p className="text-center m-6 text-2xl">No Reviews</p>
      )}
      <div>
        {reviews.map((review) => (
          <div className="border-b pb-7 mb-7">
            <div className="flex">
              <div className="w-1/6 flex flex-col items-center">
                <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                  <h2 className="text-white text-2xl">MJ</h2>
                </div>
                <p className="text-center">{`${review.first_name} ${review.last_name}`}</p>
              </div>
              <div className="ml-10 w-5/6">
                <div className="flex items-center">
                  <div className="flex mb-2">
                    <Stars ratingValue={reviews.length} />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-lg font-light">{review.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
