import { useEffect, useState } from "react";
import fetcher from "../api/fetcher";
import { usePostsStore } from "../store/postsStore";
import { url } from "../constants/api";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useInfiniteScrolling(page: number) {
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);
  const [errorPagination, setErrorPagination] = useState("");
  const { pagination, setNumberOfPosts } = usePostsStore();
  const [cookies, _] = useCookies(["token"]);

  useEffect(() => {
    if (page > 0) {
      getPosts();
    }
  }, [page]);

  const getPosts = async () => {
    setIsLoadingPagination(true);
    try {
      const response = await axios.get(`${url}/posts/?page=${page}`);

      const { posts, numberOfPosts } = response.data;
      setNumberOfPosts(numberOfPosts);
      pagination(posts);
    } catch (error) {
      if (error instanceof Error) {
        setErrorPagination(error.message);
      }
    } finally {
      setIsLoadingPagination(false);
    }
  };

  return { getPosts, isLoadingPagination, errorPagination };
}
