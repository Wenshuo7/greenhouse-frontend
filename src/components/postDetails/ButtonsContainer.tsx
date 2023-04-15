import { LikeButton, Details, Bookmark } from "../feed/SvgsContainer";
import useUserContext from "../../hooks/useUserContext";
import { Post } from "../feed/types/feedTypes";
import { url } from "../../constants/api";

export default function ButtonsContainer({
  likes,
  id,
  postId,
  updatePost,
}: Pick<Post, "id" | "postId" | "likes"> & {
  updatePost: () => void;
}) {
  const userContext = useUserContext();

  return (
    <div className="buttons-section-details">
      {likes && (
        <LikeButton
          {...{
            likes,
            receiverId: id,
            postId,
            url: `${url}/posts/`,
            updatePost,
          }}
        />
      )}
      <Details postId={postId} />
      {userContext?.user?.id ? (
        userContext?.user?.id !== id ? (
          <Bookmark postId={postId} />
        ) : null
      ) : null}
    </div>
  );
}
