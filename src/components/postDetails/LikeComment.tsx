import { LikeButton } from "../feed/SvgsContainer";
import { url } from "../../constants/api";
import useUserContext from "../../hooks/useUserContext";
import { Dispatch, SetStateAction } from "react";
import { Comments } from "./types";

export default function LikeComment({
  likes,
  postId,
  setComments,
}: {
  likes: number[];
  postId: number;
  setComments: Dispatch<SetStateAction<Comments[]>>;
}) {
  const userContext = useUserContext();

  const updateComments = () => {
    setComments((prevComments) =>
      prevComments?.map((comments) =>
        comments?.postId === postId
          ? {
              ...comments,
              likes: comments?.likes?.find(
                (like) => like === userContext?.user?.id
              )
                ? comments?.likes.filter(
                    (like) => like !== userContext?.user?.id
                  )
                : [...comments?.likes, userContext?.user?.id!],
            }
          : comments
      )
    );
  };

  return (
    <LikeButton
      {...{
        likes,
        postId,
        updateComments,
        url: `${url}/comments/`,
      }}
    />
  );
}
