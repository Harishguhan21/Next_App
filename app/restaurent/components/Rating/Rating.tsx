import Stars from "@/app/components/Stars/Stars";
import React from "react";

const Rating = ({ ratingValue }: { ratingValue: number }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        {/* <p>*****</p> */}
        <div className="flex mb-2">
          <Stars ratingValue={ratingValue} />
        </div>
        <p className="text-reg ml-3">4.9</p>
      </div>
      <div>
        <p className="text-reg ml-4">600 Reviews</p>
      </div>
    </div>
  );
};

export default Rating;
