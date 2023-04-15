import { useState } from "react";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useEditComment() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["token"]);

  const editComment = async (commentId: number, comment: string) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${url}/comments/edit`,
        {
          commentId,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      const { newComment } = response.data;

      return newComment;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { editComment, error, isLoading };
}
