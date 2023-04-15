import { useState } from "react";
import useUserContext from "./useUserContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useFollow = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [cookies] = useCookies(["token"]);

  const userContext = useUserContext();

  const changeFollowStatus = async (userId: number) => {
    setIsLoading(true);
    const response = await axios.put(
      `${url}/user/`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    const { user, error } = response.data;

    if (user) {
      userContext?.dispatch({
        type: "UPDATE_FOLLOWING",
        payload: { userId },
      });

      setIsLoading(false);
    } else {
      setErrorMessage(error);
    }
  };

  return { changeFollowStatus, errorMessage, isLoading };
};
