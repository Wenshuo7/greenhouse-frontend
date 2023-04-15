import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { CommentsCardProps } from "./types";
import default_insta from "../../assets/default_insta.jpg";
import useUserContext from "../../hooks/useUserContext";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import EditComment from "./EditComment";
import LikeComment from "./LikeComment";
import { TrashIcon } from "@heroicons/react/20/solid";
import useDeleteComment from "../../hooks/useDeleteComment";
import LoadingSpinner from "../LoadingSpinner";
import { url } from "../../constants/api";

export const CommentsCard = ({
  userId,
  username,
  userImage,
  authImage,
  comment,
  createdAt,
  likes,
  id,
  postId,
  setComments,
}: CommentsCardProps) => {
  const userContext = useUserContext();
  const { isDeleting, deleteComment, errorMsg } = useDeleteComment();
  const [selectedCommentId, setSelectedCommentId] = useState<
    number | undefined
  >(undefined);

  const handleDeleteComment = () => {
    deleteComment(id);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const imageSrc = authImage
    ? authImage
    : userImage
    ? `${url}/upload/${userImage}`
    : default_insta;

  return (
    <div className="commments-card">
      <section className="comments-info">
        <div>
          <Link to={`/profile/${userId}`}>
            <div className="flex items-center gap-5">
              <img src={imageSrc} alt="img" />
              <h4 style={{ fontWeight: "bold" }}>{username}</h4>
            </div>
          </Link>

          {selectedCommentId ? (
            <EditComment
              {...{
                setComments,
                id,
                comment,
                setSelectedCommentId,
              }}
            />
          ) : (
            <p>{comment}</p>
          )}
        </div>
        <LikeComment {...{ likes, postId, setComments }} />
      </section>
      <section className="comment-card-info">
        {createdAt && (
          <h5>
            {formatDistanceToNow(new Date(createdAt).getTime(), {
              addSuffix: true,
            })}
          </h5>
        )}
        <p>{`${likes?.length} ${likes?.length === 1 ? "like" : "likes"} `}</p>
        {userContext?.user?.id === userId ? (
          <>
            <PencilSquareIcon
              onClick={() => setSelectedCommentId(id)}
              width="20px"
              height="20px"
            />
            {isDeleting ? (
              <LoadingSpinner />
            ) : (
              <TrashIcon
                onClick={handleDeleteComment}
                width="20px"
                height="20px"
              />
            )}
          </>
        ) : null}
      </section>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};
