import { useEffect, useState } from "react";
import { useCurrentLocation } from "../../context/locationContext";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { Post } from "../feed/types/feedTypes";
import { useGetData } from "../../hooks/useGetData";
import { url } from "../../constants/api";
import { useCookies } from "react-cookie";

export default function PostsViewer({
  setPost,
  post,
}: {
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  post: Post | undefined;
}) {
  const locationContext = useCurrentLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const { getData, isLoading } = useGetData();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (locationContext.split("/").includes("profile")) {
      getData({
        url: `${url}/posts/${locationContext.split("/")[2]}`,
        setState: setPosts,
      });
    }
  }, []);

  const previousPost = () => {
    setPost(
      posts.findIndex(({ id }) => id === post?.id) === 0
        ? posts[posts.length - 1]
        : posts[posts.findIndex(({ id }) => id === post?.id) - 1]
    );
  };

  const nextPost = () => {
    setPost(
      posts.findIndex(({ id }) => id === post?.id) + 1 === posts.length
        ? posts[0]
        : posts[posts.findIndex(({ id }) => id === post?.id) + 1]
    );
  };

  return !isLoading &&
    locationContext.split("/").includes("profile") &&
    posts.length > 1 ? (
    <>
      <ArrowLeftCircleIcon className="left-arrow" onClick={previousPost} />
      <ArrowRightCircleIcon className="right-arrow" onClick={nextPost} />
    </>
  ) : null;
}
