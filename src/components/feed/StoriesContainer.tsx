import { useGetStories } from "../../hooks/useGetStories";
import StoryCard from "./StoryCard";
import useUserContext from "../../hooks/useUserContext";
import { useStoriesStore } from "../../store/storiesStore";
import StorySkeleton from "./StorySkeleton";

export default function StoriesContainer({
  setToggleAddStory,
}: {
  setToggleAddStory: (toggleAddStory: boolean) => void;
}) {
  const { isLoading, error } = useGetStories();
  const { stories } = useStoriesStore();
  const userContext = useUserContext();

  return (
    <div className="stories-container">
      {userContext?.user?.id ? (
        <div onClick={() => setToggleAddStory(true)} className="add-story">
          +
        </div>
      ) : null}
      {error && <h4>error</h4>}
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((_, i) => <StorySkeleton key={i} />)
        : null}

      {stories?.length > 0
        ? stories.map((story) => <StoryCard key={story.id} {...{ ...story }} />)
        : null}
    </div>
  );
}
