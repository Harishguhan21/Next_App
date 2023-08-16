import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
  const { data, loading, error, setAuthState }: any = useContext(
    AuthenticationContext
  );
  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      console.log("error::", error.response.data.errorMessage);
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signUp = async (
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone: string;
      city: string;
    },
    handleClose: () => void
  ) => {
    console.log(setAuthState, "setAuthState1");
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          city,
        }
      );
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signOut = () => {
    removeCookies("Jwt");
    setAuthState({
      loading: false,
      data: null,
      error: null,
    });
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
