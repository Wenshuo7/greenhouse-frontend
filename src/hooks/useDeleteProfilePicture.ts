import { useState } from "react";
import useUserContext from "./useUserContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useDeleteProfilePicture() {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingDeleteState, setIsLoading] = useState(false);
  const userContext = useUserContext();
  const [cookies] = useCookies(["token"]);

  const deleteProfilePicture = async (imageName: string) => {
    try {
      setIsLoading(true);
      const {
        data: { message, updatedUser },
      } = await axios.delete(`${url}/user/photo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        data: JSON.stringify({
          imageName,
        }),
      });

      setDeleteMessage(message);
      userContext?.dispatch({ type: "LOGIN", payload: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteProfilePicture,
    deleteMessage,
    errorMessage,
    isLoadingDeleteState,
  };
}
