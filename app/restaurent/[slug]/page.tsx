import Images from "../components/Images/Images";
import Rating from "../components/Rating/Rating";
import ReservationCard from "../components/ReservationCard/ReservationCard";
import RestaurentNavbar from "../components/RestaurentNavbar/RestaurentNavbar";
import Reviews from "../components/Reviews/Reviews";
import { PrismaClient, Review } from "@prisma/client";
import Description from "../components/Description/Description";
import Header from "../components/Header/Header";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export interface RestaurentByName {
  id: number;
  name: string;
  description: string;
  slug: string;
  images: string[];
  reviews: Review[];
  open_time: String;
  close_time: String;
}

const fetchRestaurentByName = async (
  slug: string
): Promise<RestaurentByName> => {
  const restaurent = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurent) {
    // throw Error;
    notFound();
  }

  return restaurent;
};

const RestaurantDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const resData = await fetchRestaurentByName(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurentNavbar slug={resData?.slug} />
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{resData?.name}</h1>
        </div>
        <Rating ratingValue={resData.reviews.length} />
        <Description description={resData.description} />
        <Images images={resData.images} />
        <Reviews reviews={resData.reviews} />
      </div>
      <ReservationCard
        openTime={resData?.open_time}
        closeTime={resData?.close_time}
        slug={resData?.slug}
      />
    </>
  );
};

export default RestaurantDetailsPage;
