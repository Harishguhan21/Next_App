"use client";
import { useReservation } from "@/hooks/useReservation";
import { Time } from "@/Util/convertDateToDisplayTime";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

const Form = ({
  params,
  searchParams,
}: {
  searchParams: { day: string; time: Time; partysize: string };
  params: { slug: string };
}) => {
  const [didBook, setDidBook] = useState(false);
  const { day, time, partysize } = searchParams;
  const partySize = partysize;
  const { slug } = params;
  const { reserveTable, loading, error, data } = useReservation();
  const validationSchema = yup.object().shape({
    bookerFirstName: yup.string().min(3).required(),
    bookerLastName: yup.string().min(3).required(),
    bookerEmail: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    bookerPhone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    bookerOccusion: yup.string().required(),
    bookerRequest: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      bookerFirstName: "",
      bookerLastName: "",
      bookerPhone: "",
      bookerEmail: "",
      bookerOccusion: "",
      bookerRequest: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      reserveTable({ slug, day, time, partySize }, values, setDidBook);
    },
  });

  return (
    <>
      {didBook ? (
        // <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="mt-8 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-700 mb-4">
            We appreciate your business and are excited to have you as our
            customer.
          </p>
          <p className="text-gray-700 mb-4">
            Your table has been successfully ordered and will be reserved for
            you.
          </p>
          <p className="text-gray-700 mb-10">
            If you have any questions or need further assistance, please feel
            free to contact our support team.
          </p>
          <Link
            href={"/"}
            className="mt-12 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        // </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-10 flex flex-wrap justify-between w-[660px]">
            <div className="flex">
              <div className="">
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="First name"
                  name="bookerFirstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerFirstName}
                />
                {formik.touched.bookerFirstName &&
                formik.errors.bookerFirstName ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerFirstName}
                  </div>
                ) : null}
              </div>
              <div className="ml-5">
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="Last name"
                  name="bookerLastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerLastName}
                />
                {formik.touched.bookerLastName &&
                formik.errors.bookerLastName ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerLastName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex">
              <div className="">
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="Phone number"
                  name="bookerPhone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerPhone}
                />
                {formik.touched.bookerPhone && formik.errors.bookerPhone ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerPhone}
                  </div>
                ) : null}
              </div>
              <div className="ml-5">
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="Email"
                  name="bookerEmail"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerEmail}
                />
                {formik.touched.bookerEmail && formik.errors.bookerEmail ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerEmail}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex">
              <div>
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="Occusion (optional)"
                  name="bookerOccusion"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerOccusion}
                />
                {formik.touched.bookerOccusion &&
                formik.errors.bookerOccusion ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerOccusion}
                  </div>
                ) : null}
              </div>
              <div className="ml-5">
                <input
                  type="text"
                  className="border rounded p-3 w-80 mb-4"
                  placeholder="Requests (optional)"
                  name="bookerRequest"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bookerRequest}
                />
                {formik.touched.bookerRequest && formik.errors.bookerRequest ? (
                  <div className="text-red-500 mb-2">
                    {formik.errors.bookerRequest}
                  </div>
                ) : null}
              </div>
            </div>
            <button
              className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Complete reservation"
              )}
            </button>
            <p className="mt-4 text-sm">
              By clicking “Complete reservation” you agree to the OpenTable
              Terms of Use and Privacy Policy. Standard text message rates may
              apply. You may opt out of receiving text messages at any time.
            </p>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
