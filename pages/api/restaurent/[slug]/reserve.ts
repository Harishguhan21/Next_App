import { times } from "@/data/times";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  const restaurentData = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
    select: {
      Table: true,
      open_time: true,
      close_time: true,
      id: true,
    },
  });

  const restaurent = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurent) {
    return res.status(400).json({
      errorMessage: "Restaurent not found",
    });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurent.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurent.close_time}`)
  ) {
    return res.status(400).json({
      errorMessage: "Restaurent is not Open at the time",
    });
  }

  const searchTimes: any = times.find((val) => {
    return val.time === time;
  })?.searchTimes;

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      BookingOnTables: true,
    },
  });

  const bookingTableObj: any = {};

  bookings.forEach((item) => {
    bookingTableObj[item.booking_time.toISOString()] =
      item.BookingOnTables.reduce((obj, table) => {
        console.log(obj, "obj");
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const searchTimesWithTable = searchTimes.map((item: any) => {
    return {
      date: new Date(`${day}T${item}`),
      time: item,
      table: restaurentData?.Table,
    };
  });

  searchTimesWithTable.forEach((item: any) => {
    item.table = item.table?.filter((table: any) => {
      if (bookingTableObj[item.date.toISOString()]) {
        if (bookingTableObj[item.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  const availableTables = searchTimesWithTable.find((item: any) => {
    console.log(
      item.date.toISOString() === new Date(`${day}T${time}`).toISOString(),
      "condition"
    );
    return item.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  });

  const tableCount: any = {
    2: [],
    4: [],
  };

  availableTables.table.forEach((item: any) => {
    if (item.seats === 2) {
      tableCount["2"].push(item.id);
    }
    if (item.seats === 4) {
      tableCount["4"].push(item.id);
    }
  });

  const tableToBook: number[] = [];

  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tableCount["4"].length) {
        tableToBook.push(tableCount["4"][0]);
        tableCount["4"].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tableToBook.push(tableCount["2"][0]);
        tableCount["2"].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tableCount["2"].length) {
        tableToBook.push(tableCount["2"][0]);
        tableCount["2"].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tableToBook.push(tableCount["4"][0]);
        tableCount["4"].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    }
  }

  // if (req.method === "POST") {
  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccusion,
    bookerRequest,
  }: any = req.body;

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_occsion: bookerOccusion,
      booker_request: bookerRequest,
      restaurent_id: restaurentData?.id,
    },
  });

  const bookingOnTableData = tableToBook.map((table_id) => {
    return {
      table_id,
      booking_id: booking.id,
    };
  });
  await prisma.bookingOnTables.createMany({
    data: bookingOnTableData,
  });
  // }

  return res.json(booking);
}
