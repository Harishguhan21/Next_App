"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";

export const AuthenticationContext = createContext({
  loading: false,
  data: null,
  error: null,
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState]: any = useState({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUserData = async () => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const jwt = getCookie("Jwt");
      console.log(jwt, "jwt");

      if (!jwt) {
        return setAuthState({
          loading: false,
          data: null,
          error: null,
        });
      }

      const response = await axios.get(
        "http://localhost:3000/api/auth/userDetails",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response, "response");

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
