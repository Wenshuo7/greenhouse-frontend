import default_insta from "../../assets/default_insta.jpg";
import { Link } from "react-router-dom";
import { CommentsContainer } from "./CommentsContainer";
import { Post } from "../feed/types/feedTypes";
import { url } from "../../constants/api";

export default function CaptionContainer({
  id,
  text,
  userImage,
  authImage,
  username,
  setCommentMessage,
  commentMessage,
}: Pick<Post, "id" | "text" | "userImage" | "username" | "authImage"> & {
  commentMessage: string;
  setCommentMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const imageSrc = authImage
    ? authImage
    : userImage
    ? `${url}/upload/${userImage}`
    : default_insta;

  return (
    <div className="caption-comments">
      <div className="caption-section">
        <Link to={`/profile/${id}`}>
          <div className="caption-info">
            <img src={imageSrc} />
            <h2>{username}</h2>
          </div>
        </Link>
        <p>{text}</p>
      </div>
      <CommentsContainer
        commentNotification={setCommentMessage}
        commentMessage={commentMessage}
      />
    </div>
  );
}
