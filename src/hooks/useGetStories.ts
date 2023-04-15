import { useEffect, useState } from "react";
import { useStoriesStore } from "../store/storiesStore";
import { url } from "../constants/api";

import axios from "axios";

export type Story = {
  content: string;
  userId: number;
  username: string;
  userImage: string;
  id: number;
  createdAt: string;
  authImage: string;
  type: string;
};

export const useGetStories = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const { load, stories } = useStoriesStore();
  //   const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (stories.length === 0) {
      getStories();
    }
  }, []);

  const getStories = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${url}/story/`);
      const { stories } = response.data;

      if (stories.error) {
        setError(stories.error);
      }

      load(stories);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error };
};
