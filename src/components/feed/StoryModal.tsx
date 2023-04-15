import { url } from "../../constants/api";
import { useGetStory } from "../../hooks/useGetStoryById";
import { useStoriesStore } from "../../store/storiesStore";
import default_insta from "../../assets/default_insta.jpg";
import { Link } from "react-router-dom";

export default function StoryModal({
  storyId,
  toggleStoryModal,
  setToggleStoryModal,
}: {
  storyId: number;
  setToggleStoryModal: (toogleStoryModal: boolean) => void;
  toggleStoryModal: boolean;
}) {
  const { stories } = useStoriesStore();

  const story = stories.find((story) => story.id === storyId);

  const imageSrc = story?.authImage
    ? story?.authImage
    : story?.userImage
    ? `${url}/upload/${story?.userImage}`
    : default_insta;

  return (
    <div
      className={`story-modal ${toggleStoryModal ? "active" : ""}`}
      onClick={() => setToggleStoryModal(false)}
    >
      <Link
        onClick={(e) => e.stopPropagation()}
        to={`profile/${story?.userId}`}
      >
        <div className="story-header">
          <img src={imageSrc} />
          <h4>{story?.username}</h4>
        </div>
      </Link>
      {story?.type === "image" ? (
        <img
          onClick={(e) => e.stopPropagation()}
          src={`${url}/upload/${story?.content}`}
        />
      ) : (
        <video
          onClick={(e) => e.stopPropagation()}
          className="video-player"
          controls
          src={`${url}/upload/${story?.content}`}
        ></video>
      )}
    </div>
  );
}
