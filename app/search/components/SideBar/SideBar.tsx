import { PRICE } from "@prisma/client";
import Link from "next/link";

const SideBar = ({
  restaurentLocation,
  restaurentCusine,
  searchParams,
}: any) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg font-light rounded-l p-2",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg font-light rounded-l p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg font-light rounded-l p-2",
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {restaurentLocation.map((item: any) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: item.name,
              },
            }}
            className="font-light text-reg"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {restaurentCusine.map((item: any) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, cusine: item.name },
            }}
            className="font-light text-reg"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((item) => (
            <Link
              href={{
                query: {
                  ...searchParams,
                  price: item.price,
                },
              }}
              className={item.className}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
