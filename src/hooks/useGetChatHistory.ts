import fetcher from "../api/fetcher";
import useUserContext from "./useUserContext";
import { UserType } from "../context/userContext";
import { useEffect, useState } from "react";
import { useAddChatData } from "../context/chatDataContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useGetChatHistory(selectedUser: UserType | undefined) {
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["token"]);

  const addChatHistory = useAddChatData();

  useEffect(() => {
    if (selectedUser?.id) {
      getChatData();
    }
  }, [selectedUser?.id]);

  const getChatData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          author: userContext?.user?.id,
          receiver: selectedUser?.id,
        },
      });

      const chatData = response.data;

      addChatHistory(chatData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error };
}
