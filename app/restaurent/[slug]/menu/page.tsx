import React from "react";
import Menu from "../../components/Menu/Menu";
import RestaurentNavbar from "../../components/RestaurentNavbar/RestaurentNavbar";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();
const fetchItems = async (slug: string) => {
  const resItems = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!resItems) {
    notFound();
  }

  return resItems;
};
const RestaurentMenu = async ({ params }: { params: { slug: string } }) => {
  const menuItems: any = await fetchItems(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurentNavbar slug={params.slug} />
        <Menu menuItems={menuItems} />
      </div>
    </>
  );
};

export default RestaurentMenu;
