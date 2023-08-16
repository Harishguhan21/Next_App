import Header from "./components/Header/Header";
import RestaurentCard from "./components/RestaurentCard/RestaurentCard";
import { PrismaClient, Location, Cusine, PRICE, Review } from "@prisma/client";
import LoginModal from "./components/AuthModal/AuthModal";

export interface RestaurentType {
  id: number;
  name: string;
  main_image: string;
  location: Location;
  cusine: Cusine;
  slug: any;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurent = async (): Promise<RestaurentType[]> => {
  const restarents = await prisma.restaurent.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      location: true,
      cusine: true,
      slug: true,
      price: true,
      reviews: true,
    },
  });
  return restarents;
};

const Home = async () => {
  const restaurentData = await fetchRestaurent();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurentData.map((item) => {
          return <RestaurentCard restaurentDetails={item} />;
        })}
      </div>
    </main>
  );
};

export default Home;
