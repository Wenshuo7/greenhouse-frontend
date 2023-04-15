import { LikeButton, Details, Bookmark } from "./SvgsContainer";
import { Link } from "react-router-dom";
import { CommentForm } from "./CommentForm";
import { PostCardProps } from "./types/feedTypes";
import { formatDistanceToNow } from "date-fns";
import useUserContext from "../../hooks/useUserContext";
import default_insta from "../../assets/default_insta.jpg";
import CarouselSlider from "./CarouselSlider";
import { usePostsStore } from "../../store/postsStore";
import { url } from "../../constants/api";

export const PostCard = ({
  username,
  postId,
  imageUrl,
  likes,
  text,
  createdAt,
  id,
  index,
  userImage,
  authImage,
  types,
  listRef,
}: PostCardProps): JSX.Element => {
  const userContext = useUserContext();
  const { posts } = usePostsStore();

  const imageSrc = authImage
    ? authImage
    : userImage
    ? `${url}/upload/${userImage}`
    : default_insta;

  if (!id) return <h1>Loading...</h1>;
  return (
    <div className="card" ref={index === posts.length - 1 ? listRef : null}>
      <Link to={`/profile/${id}`}>
        <section className="user-section">
          <img src={imageSrc} />
          <h2>{username}</h2>
        </section>
      </Link>
      <Link to={`/p/${postId}`}>
        <CarouselSlider {...{ images: imageUrl, types }} />
      </Link>
      <section className="buttons-section">
        <LikeButton
          likes={likes}
          receiverId={id}
          postId={postId}
          url={`${url}/posts/`}
        />
        <Details postId={postId} />
        {userContext?.user?.id ? (
          userContext?.user?.id !== id ? (
            <Bookmark postId={postId} />
          ) : (
            ""
          )
        ) : null}
      </section>
      <section className="likes-section">
        <h4>{`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}</h4>
      </section>

      <section className="description-section">
        <Link to={`/profile/${id}`}>
          <div>
            <img src={imageSrc} />
            <h3>{username}</h3>
          </div>
        </Link>
        <p>{text}</p>
      </section>

      <section>
        <Link to={`/p/${postId}`}>
          <p>View all comments</p>
        </Link>
      </section>

      <section>
        {createdAt && (
          <h5>
            {formatDistanceToNow(new Date(createdAt).getTime(), {
              addSuffix: true,
            })}
          </h5>
        )}
      </section>
      <CommentForm {...{ postId }} />
    </div>
  );
};
