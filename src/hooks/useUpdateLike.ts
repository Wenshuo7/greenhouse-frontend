import { useState } from "react";
import { usePostsStore } from "../store/postsStore";
import { useCookies } from "react-cookie";
import axios from "axios";

interface updateLikeProps {
  url: string;
  postId: number;
}

export default function useUpdateLike() {
  const { changeLikeState } = usePostsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cookies, _] = useCookies(["token"]);

  const updateLike = async ({ url, postId }: updateLikeProps) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        url,

        {
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const axiosReq = response.data;

      changeLikeState(axiosReq.post);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateLike, isLoading, error };
}
