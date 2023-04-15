import { useEffect, useState } from "react";
import fetcher from "../api/fetcher";
import { usePostsStore } from "../store/postsStore";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export const useGetPosts = () => {
  const [isLoadingState, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { load, setNumberOfPosts, posts } = usePostsStore();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
  }, []);

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${url}/posts/?page=${0}`);
      const { posts, numberOfPosts } = response.data;

      if (posts.error) {
        setError(posts.error);
      }

      setNumberOfPosts(numberOfPosts);
      load(posts);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoadingState, error };
};
