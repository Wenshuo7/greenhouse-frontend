import { useState } from "react";
import { CommentButton } from "../buttons/CommentButton";
import { url } from "../../constants/api";

import { useCookies } from "react-cookie";
import axios from "axios";

interface CommentFormProps {
  postId: number;
  commentNotification?: (comment: string) => void;
}

export const CommentForm = ({
  postId,
  commentNotification = () => {},
}: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [cookies] = useCookies(["token"]);

  const createComment = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/comments/`,
        {
          comment,
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      commentNotification!(data.message);
      setErrorMessage(data?.error);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setComment("");
    }
  };

  return (
    <form className="comment-form" onSubmit={createComment}>
      {errorMessage}
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <CommentButton
        disabled={comment ? false : true}
        className={comment ? "zinc" : "slate"}
      >
        Post
      </CommentButton>
    </form>
  );
};
