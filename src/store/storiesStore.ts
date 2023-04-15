import { create } from "zustand";

import { Story } from "../hooks/useGetStories";

type StoriesStore = {
  stories: Story[];

  addStory: (story: Story) => void;
  load: (stories: Story[]) => void;
};

export const useStoriesStore = create<StoriesStore>((set) => ({
  stories: [],

  addStory: (story) =>
    set((state) => ({
      ...state,
      stories: [story, ...state.stories],
    })),
  load: (stories) =>
    set((state) => ({
      ...state,
      stories: stories,
    })),
}));
