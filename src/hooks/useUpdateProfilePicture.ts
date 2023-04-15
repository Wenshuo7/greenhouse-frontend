import { useState } from "react";
import fetcher from "../api/fetcher";
import useUserContext from "./useUserContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useUpdateProfilePicture() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const userContext = useUserContext();
  const [cookies, _] = useCookies(["token"]);

  const updateProfilePicture = async (formData: FormData) => {
    const headers = {
      Authorization: `Bearer ${cookies.token}`,
    };
    const config = {
      headers,
    };

    try {
      setIsLoading(true);
      const {
        data: { message, updatedUser },
      } = await axios.put(`${url}/user/photo`, formData, config);

      setMessage(message);
      userContext?.dispatch({ type: "LOGIN", payload: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfilePicture, isLoading, message, error };
}
