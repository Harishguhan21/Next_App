import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "@/data/times";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize }: any = req.query;

  if (!slug || !day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  const searchTimes = times.find((val) => {
    return val.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

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
  console.log(bookings, "bookingTableObj");
  // console.log(bookings?.BookingOnTables, "table");

  bookings.forEach((item) => {
    bookingTableObj[item.booking_time.toISOString()] =
      item.BookingOnTables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const restaurentData = await prisma.restaurent.findUnique({
    where: {
      slug,
    },
    select: {
      Table: true,
      open_time: true,
      close_time: true,
    },
  });

  const searchTimesWithTable = searchTimes.map((item) => {
    return {
      date: new Date(`${day}T${item}`),
      time: item,
      table: restaurentData?.Table,
    };
  });

  searchTimesWithTable.forEach((item) => {
    item.table = item.table?.filter((table) => {
      if (bookingTableObj[item.date.toISOString()]) {
        if (bookingTableObj[item.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });
  const availabilities = searchTimesWithTable
    .map((val) => {
      const sumSeats: any = val.table?.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);
      return {
        time: val.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((avail) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${avail.time}`) >=
        new Date(`${day}T${restaurentData?.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${avail.time}`) <=
        new Date(`${day}T${restaurentData?.close_time}`);
      console.log(timeIsAfterOpeningHour, timeIsBeforeClosingHour, "condition");
      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return res.status(200).json(
    // searchTimes,
    // bookings,
    // bookingTableObj,
    // restaurentData,
    // searchTimesWithTable,
    availabilities,
    // bookingTableObj
  );
}
