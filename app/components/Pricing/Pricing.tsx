import { PRICE } from "@prisma/client";

const Pricing = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    } else if (price === PRICE.EXPENSIVE) {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };

  return <p className="ml-2 mx-2">{renderPrice()}</p>;
};

export default Pricing;
