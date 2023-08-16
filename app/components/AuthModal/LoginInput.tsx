import { useFormik } from "formik";
import * as yup from "yup";

export default function LoginInput({ handleLogin }: any) {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),

    password: yup.string().required().min(8),
  });

  const handleChange = (e: any) => {
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <main>
      <form onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-xl text-center m-4">
          SignIn to your Account
        </h3>
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
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
