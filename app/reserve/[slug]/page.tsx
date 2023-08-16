import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import { PrismaClient } from "@prisma/client";
import { Time } from "@/Util/convertDateToDisplayTime";

const prisma = new PrismaClient();

const fetchRestaurentBySlug = async (slug: string) => {
  const restaurent = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
  });

  return restaurent;
};

const ReservationPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { day: string; time: Time; partysize: string };
}) => {
  const restaurentData: any = await fetchRestaurentBySlug(params?.slug);

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          resTitle={restaurentData.name}
          resImage={restaurentData?.main_image}
          date={searchParams.day}
          time={searchParams.time}
          partySize={searchParams.partysize}
        />
        <Form searchParams={searchParams} params={params}/>
      </div>
    </div>
  );
};

export default ReservationPage;
