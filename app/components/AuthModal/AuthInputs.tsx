import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  handleInputChange: (e: any) => void;
  isSignIn: boolean;
}

export default function AuthInputs({ handleInputChange, isSignIn }: Props) {
  const validationSchema = yup.object().shape({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    city: yup.string().required(),
    password: yup.string().required().min(8),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleInputChange(values);
    },
  });

  const handleChange = (e: any) => {
    formik.handleChange(e);
  };
  return (
    <div className="">
      <h3 className="font-bold text-xl text-center m-4">
        {isSignIn ? "Create Account" : "SignIn to your Account"}{" "}
      </h3>

      {isSignIn ? (
        <h1 className="text-center text-3xl m-5">
          Create Your OpenTable Account
        </h1>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-10">
          {isSignIn ? (
            <div className="flex">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="rounded border py-2 p-2  w-full"
                  placeholder="FirstName"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  name="firstName"
                  autoComplete="off"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="rounded border py-2 p-2 ml-2 w-full"
                  placeholder="lastName"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  // onChange={hanleInputChange}
                  name="lastName"
                  autoComplete="off"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="mt-5">
            <input
              type="email"
              className="rounded border py-2 p-2 w-full"
              placeholder="email"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          {isSignIn ? (
            // <div className="">
            <div className="flex mt-5">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="rounded border py-2 p-2 w-full"
                  placeholder="phone"
                  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  value={formik.values.phone}
                  name="phone"
                  autoComplete="off"
                />

                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="rounded border py-2 p-2 ml-2 w-full"
                  placeholder="city"
                  onBlur={formik.handleBlur}
                  onChange={handleChange}
                  value={formik.values.city}
                  name="city"
                  autoComplete="off"
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500">{formik.errors.city}</div>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="mt-5">
            <input
              type="text"
              className="rounded border py-2 p-2 w-full"
              placeholder="password"
              onBlur={formik.handleBlur}
              onChange={handleChange}
              value={formik.values.password}
              name="password"
              autoComplete="off"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            className="w-full bg-[#da3743] text-white uppercase py-3 mt-5 rounded"
            type="submit"
            // onSubmit={formik.handleSubmit}
          >
            {isSignIn ? "create account" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
