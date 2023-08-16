import fullStar from "../../../public/icons/full-star.png";
import halfStar from "../../../public/icons/half-star.png";
import emptyStar from "../../../public/icons/empty-star.png";
import Image from "next/image";
const Stars = ({ ratingValue }: any) => {
  const ratingStar = () => {
    if (ratingValue >= 3) {
      return (
        <>
          <div className="flex">
            <Image src={fullStar} width={20} height={20} alt="star" />
            <Image src={fullStar} width={20} height={20} alt="star" />
            <Image src={fullStar} width={20} height={20} alt="star" />
            <Image src={fullStar} width={20} height={20} alt="star" />
            <Image src={halfStar} width={20} height={20} alt="star" />
          </div>
        </>
      );
    }
    if (ratingValue >= 2) {
      return (
        <div className="flex">
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
        </div>
      );
    }
    if (ratingValue >= 1) {
      return (
        <div className="flex">
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
        </div>
      );
    }
    if (ratingValue >= 0) {
      return (
        <div className="flex">
          <Image src={fullStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
          <Image src={emptyStar} width={20} height={20} alt="star" />
        </div>
      );
    }
  };
  return <div>{ratingStar()}</div>;
};

export default Stars;
