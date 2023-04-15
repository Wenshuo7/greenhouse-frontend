import { useState, Dispatch, SetStateAction } from "react";
import { url } from "../constants/api";
import { useStoriesStore } from "../store/storiesStore";

import { useCookies } from "react-cookie";
import axios from "axios";
import { Story } from "./useGetStories";

export default function useCreateStory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { addStory } = useStoriesStore();
  const [cookies] = useCookies(["token"]);

  const createStory = async (formData: FormData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/story/`, formData, config);

      const story = response.data;

      addStory(story);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createStory,
    isLoading,
    error,
  };
}
