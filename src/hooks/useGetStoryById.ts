import { useEffect, useState } from "react";
import { url } from "../constants/api";

import axios from "axios";
import { Story } from "./useGetStories";

export const useGetStory = (storyId: number) => {
  const [isLoadingState, setIsLoading] = useState(false);
  const [story, setStory] = useState<Story>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (storyId) {
      getStory();
    }
  }, [storyId]);

  const getStory = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${url}/story/${storyId}`);
      const story = response.data;

      if (story.error) {
        setError(story.error);
      }

      setStory(story);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoadingState, error, story };
};
