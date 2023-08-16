import Header from "./components/Header/Header";
import RestaurentCard from "./components/RestaurentCard/RestaurentCard";
import SideBar from "./components/SideBar/SideBar";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface searchParams {
  city: string;
  cusine: string;
  price: PRICE;
}

const fetchHotelData = async (searchParams: searchParams) => {
  const where: any = {};
  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cusine) {
    const cusine = {
      name: {
        equals: searchParams.cusine.toLowerCase(),
      },
    };
    where.cusine = cusine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    cusine: true,
    location: true,
    price: true,
    reviews: true,
  };

  return prisma.restaurent.findMany({
    where,
    select,
  });
};

const fetchLocation = async () => {
  const allLocation = await prisma.location.findMany();
  return allLocation;
};

const fetchCusine = async () => {
  const allCusine = await prisma.cusine.findMany();
  return allCusine;
};

const SearchPage = async ({ searchParams }: { searchParams: searchParams }) => {
  const restaurentData = await fetchHotelData(searchParams);
  const restaurentLocation = await fetchLocation();
  const restaurentCusine = await fetchCusine();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar
          restaurentLocation={restaurentLocation}
          restaurentCusine={restaurentCusine}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurentData.map((item) => (
            <RestaurentCard restaurent={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
