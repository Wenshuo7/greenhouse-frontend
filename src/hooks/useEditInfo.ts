import { useState } from "react";
import fetcher from "../api/fetcher";
import useUserContenxt from "./useUserContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useEditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userContext = useUserContenxt();
  const [cookies] = useCookies(["token"]);

  const editInfo = async (
    username: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${url}/user/edit`,
        {
          username,
          firstName,
          lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      userContext?.dispatch({ type: "LOGIN", payload: response.data });
      setMessage("user info updated");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editInfo, isLoading, error, message };
}
