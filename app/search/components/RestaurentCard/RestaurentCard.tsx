import Pricing from "@/app/components/Pricing/Pricing";
import Stars from "@/app/components/Stars/Stars";
import Link from "next/link";
const RestaurentCard = ({ restaurent }: { restaurent: any }) => {
  return (
    <div className="border-b flex pb-5 mt-2 mx-10">
      <img src={restaurent.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurent.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars ratingValue={restaurent.reviews.length} />
          </div>
          <p className="ml-2 text-sm">
            {restaurent.reviews.length > 4
              ? "Awesome"
              : restaurent.reviews.length > 2
              ? "Good"
              : "Average"}
          </p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Pricing price={restaurent.price} />
            <p className="mr-4">{restaurent.cusine.name}</p>
            <p className="mr-4">{restaurent.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href="">View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurentCard;
