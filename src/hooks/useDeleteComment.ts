import { useState } from "react";
import fetcher from "../api/fetcher";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useDeleteComment() {
  const [errorMsg, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cookies] = useCookies(["token"]);

  const deleteComment = async (commentId: number) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${url}/comments/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        data: JSON.stringify({
          commentId,
        }),
      });

      return commentId;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteComment, errorMsg, isDeleting };
}
