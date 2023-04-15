import { useState } from "react";
import { url } from "../constants/api";
import useUserContext from "./useUserContext";
import { useCookies } from "react-cookie";

export default function useGoogleSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userContext = useUserContext();
  const [cookies, setCookies] = useCookies(["token", "user"]);

  const login = async ({
    username,
    token,
  }: {
    username: string;
    token: string;
  }) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, token }),
      });
      const json = await res.json();

      if (json.error) {
        setError(json.error);
      } else {
        setMessage("Success");
        userContext?.dispatch({ type: "LOGIN", payload: json.user });
        setCookies("token", json.token, { path: "/", secure: true });
        setCookies("user", json.user, { path: "/", secure: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    message,
  };
}
