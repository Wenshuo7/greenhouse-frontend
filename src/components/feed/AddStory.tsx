import { useState } from "react";
import useCreateStory from "../../hooks/useCreateStory";
import isFileImage from "../../utils/isFileImage";

export default function AddStory({
  toggleAddStory,
  setToggleAddStory,
}: {
  toggleAddStory: boolean;
  setToggleAddStory: (toggleAddStory: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const { createStory, isLoading, error } = useCreateStory();

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("content", file);
      formData.append("contentName", file.name);
      formData.append("type", file["type"].split("/")[0]);

      await createStory(formData);
      isLoading ? null : setFile(null), setToggleAddStory(false);
    }
  };

  const handleContentUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = evt.target.files?.[0];
    if (fileInput) {
      setFile(fileInput);
    }
  };

  return (
    <div
      className="add-story-container"
      style={{ display: `${!toggleAddStory ? "none" : ""}` }}
      onClick={(e) => {
        e.stopPropagation();
        setToggleAddStory(false);
        setFile(null);
      }}
    >
      {!file && (
        <div onClick={(e) => e.stopPropagation()}>
          <label htmlFor="file-input">Choose a file</label>
          <input
            id="file-input"
            type="file"
            onChange={handleContentUpload}
            style={{ display: "none" }}
          />
        </div>
      )}
      {file && (
        <div className="story-content" onClick={(e) => e.stopPropagation()}>
          {isFileImage(file) ? (
            <img src={URL.createObjectURL(file)} alt="story-content" />
          ) : (
            <video
              className="video-player"
              controls
              src={URL.createObjectURL(file)}
            ></video>
          )}
          <button onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Add"}
          </button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}
