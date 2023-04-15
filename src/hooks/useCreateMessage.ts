import { useState } from "react";
import { ChatType } from "../context/chatDataContext";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useCreateMessage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies(["token"]);

  const createMessage = async (messageData: ChatType) => {
    try {
      await axios.post(`${url}/chat`, messageData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return { createMessage, errorMessage };
}
