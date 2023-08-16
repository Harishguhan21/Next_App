import Link from "next/link";
import React from "react";

const RestaurentNavbar = ({ slug }: { slug: string }) => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurent/${slug}`} className="mr-7">
        {" "}
        Overview{" "}
      </Link>
      <Link href={`/restaurent/${slug}/menu`} className="mr-7">
        {" "}
        Menu{" "}
      </Link>
    </nav>
  );
};

export default RestaurentNavbar;
