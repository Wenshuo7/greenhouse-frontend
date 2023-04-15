import { useState } from "react";
import { ShareButton } from "../buttons/ShareButton";
import useUserContext from "../../hooks/useUserContext";
import useCreatePost from "../../hooks/useCreatePost";
import { Navigate } from "react-router-dom";
import { CaptionContainerProps } from "./types";
import { url } from "../../constants/api";
import default_insta from "../../assets/default_insta.jpg";

export default function CaptionContainer({
  files,
  setToggleCreatePost,
}: CaptionContainerProps) {
  const [caption, setCaption] = useState("");
  const userContext = useUserContext();
  const { createPost, isLoading, message, error } = useCreatePost();

  const handleSubmit = async () => {
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images[]", files[i]);
        formData.append("imageNames[]", files[i].name);
        formData.append("types[]", files[i]["type"].split("/")[0]);
      }

      formData.set("text", caption);

      await createPost(formData);
      setCaption("");
      setToggleCreatePost(false);
    }
  };

  return (
    <div className="caption-container">
      <div className="user-info">
        <img
          src={
            userContext?.user?.authImage
              ? userContext?.user.authImage
              : userContext?.user?.imageUrl
              ? `${url}/upload/${userContext?.user?.imageUrl}`
              : default_insta
          }
          alt={userContext?.user.username}
        />
        <h4>{userContext?.user.username}</h4>
        <ShareButton
          disabled={caption ? false : true}
          onClick={handleSubmit}
          className="share-btn"
        >
          {isLoading ? "Loading..." : "Share"}
        </ShareButton>
      </div>
      <textarea
        value={caption}
        onChange={(e) => setCaption(() => e.target.value)}
        placeholder="Write a caption..."
      />
      {message && <Navigate to="/" />}
      {error && <h2>{error}</h2>}
    </div>
  );
}
