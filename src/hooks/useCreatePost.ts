import { useState, Dispatch, SetStateAction } from "react";
import { url } from "../constants/api";
import { usePostsStore } from "../store/postsStore";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { addPost } = usePostsStore();
  const [cookies] = useCookies(["token"]);

  const createPost = async (formData: FormData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/posts/`, formData, config);

      const post = response.data;

      addPost(post);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
    message,
  };
}
