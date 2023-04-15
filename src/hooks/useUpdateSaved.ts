import fetcher from "../api/fetcher";
import useUserContext from "./useUserContext";
import { url } from "../constants/api";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

interface updateSavedProps {
  postId: number;
}

export default function useUpdateSaved() {
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, _] = useCookies(["token"]);
  const [error, setError] = useState("");

  const updateSaved = async ({ postId }: updateSavedProps) => {
    setIsLoading(true);
    try {
      await axios.put(
        `${url}/saved/`,
        {
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      userContext?.dispatch({
        type: "UPDATE_SAVED",
        payload: {
          postId,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSaved, isLoading, error };
}
