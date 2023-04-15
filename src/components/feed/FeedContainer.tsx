import { PostCard } from "./PostCard";
import { useEffect, useState, useRef, useCallback } from "react";
import { useGetUsers } from "../../hooks/useGetUsers";
import useUserContext from "../../hooks/useUserContext";
import "./feed.css";
import AddStory from "./AddStory";
import { UserCard } from "../UserCard";

import { usePostsStore } from "../../store/postsStore";
import { useGetPosts } from "../../hooks/useGetPosts";
import LoadingSpinner from "../LoadingSpinner";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import { useCookies } from "react-cookie";
import ProfileCard from "./ProfileCard";
import SuggestedUserSkeleton from "./SuggestedUserSkeleton";
import { socket } from "../../constants/socket";
import StoriesContainer from "./StoriesContainer";

export const FeedContainer = () => {
  const { getUsers, isLoading, users } = useGetUsers();
  const userContext = useUserContext();
  const { posts, numberOfPosts } = usePostsStore();
  const { isLoadingState, error } = useGetPosts();
  const [page, setPage] = useState(0);
  const { isLoadingPagination, errorPagination } = useInfiniteScrolling(page);
  const [cookies] = useCookies(["token"]);

  const [toggleAddStory, setToggleAddStory] = useState(false);

  let observer = useRef<IntersectionObserver | null>(null);
  let listRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingPagination) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && numberOfPosts > posts?.length) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [numberOfPosts > posts?.length]
  );

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user.id !== userContext?.user?.id &&
      !userContext?.user?.following?.find(
        (userToFollow) => userToFollow === user?.id
      )
  );

  if (isLoadingState || !posts) return <LoadingSpinner />;

  return (
    <main className="feed-container">
      {error && <h1>{error}</h1>}

      {/* user stories */}
      <StoriesContainer {...{ setToggleAddStory }} />
      <AddStory {...{ toggleAddStory, setToggleAddStory }} />

      <div>
        {posts
          ? posts?.map((post, i) => (
              <PostCard key={i} {...post} index={i} {...{ listRef }} />
            ))
          : null}
      </div>

      {isLoadingPagination && <LoadingSpinner />}
      {errorPagination && <h1>{errorPagination}</h1>}
    </main>
  );
};
