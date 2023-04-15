import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import Logout from "../hooks/useLogout";

import { url } from "../constants/api";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { logout } = Logout();
  const navigate = useNavigate();
  const [isTokenChecked, setIsTokenChecked] = useState(false);



  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (config.headers.Authorization) {
          const auth = config.headers.Authorization as string;

          const token = auth.split(" ")[1];

          if (token.length < 10) {
            logout();
            navigate("/login");
          } else {
            if (!isTokenChecked) {
              setIsTokenChecked(true);
            }
          }
        }

        return config;
      },
      (error) => {
        // Do something with request error

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [isTokenChecked, logout, navigate]);

  return <>{children}</>;
};

export { AuthWrapper };
