import FileInput from "../FileInput";
import ImageCard from "./ImageCard";
import { v4 as uuidv4 } from "uuid";
import { ImagesContainerProps } from "./types";
import isFileImage from "../../utils/isFileImage";

export default function ImagesContainer({
  files,
  handleImageUpload,
  handleRemoveFile,
}: ImagesContainerProps) {
  return (
    <div className="images-container">
      {files.map((file, i) =>
        isFileImage(file) ? (
          <ImageCard
            key={uuidv4()}
            {...{ file }}
            removeFile={() => handleRemoveFile(i)}
          />
        ) : (
          <video
            key={uuidv4()}
            controls
            src={URL.createObjectURL(file)}
          ></video>
        )
      )}
      <FileInput {...{ handleImageUpload, title: "Add" }} />
    </div>
  );
}
