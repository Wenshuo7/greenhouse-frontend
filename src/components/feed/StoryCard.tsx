import { useState } from "react";
import { Story } from "../../hooks/useGetStories";
import StoryModal from "./StoryModal";
import { url } from "../../constants/api";

export default function StoryCard({
  content,
  createdAt,
  userImage,
  authImage,
  username,
  type,
  id,
}: Story) {
  const [toggleStoryModal, setToggleStoryModal] = useState(false);

  return (
    <div
      onClick={() => setToggleStoryModal(!toggleStoryModal)}
      className="story-card"
    >
      {type === "image" ? (
        <img src={`${url}/upload/${content}`} />
      ) : (
        <video
          className="video-player"
          src={`${url}/upload/${content}`}
        ></video>
      )}
      <StoryModal {...{ toggleStoryModal, setToggleStoryModal, storyId: id }} />
    </div>
  );
}
