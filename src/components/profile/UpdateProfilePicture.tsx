import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import default_insta from "../../assets/default_insta.jpg";
import useDeleteProfilePicture from "../../hooks/useDeleteProfilePicture";
import useUpdateProfilePicture from "../../hooks/useUpdateProfilePicture";
import ChangePictureModal from "./ChangePictureModal";
import LoadingSpinner from "../LoadingSpinner";
import { url } from "../../constants/api";

export default function UploadProfilePicture() {
  const userContext = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const {
    deleteProfilePicture,
    deleteMessage,
    errorMessage,
    isLoadingDeleteState,
  } = useDeleteProfilePicture();

  const { updateProfilePicture, isLoading, message, error } =
    useUpdateProfilePicture();

  const [image, setImage] = useState<File | undefined>(undefined);

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.set("imageUrl", image!);
    formData.set("imageName", image?.name!);
    updateProfilePicture(formData);
  };

  const imageSrc = image
    ? URL.createObjectURL(image)
    : userContext?.user.authImage
    ? userContext?.user.authImage
    : userContext?.user.imageUrl
    ? `${url}/upload/${userContext?.user?.imageUrl}`
    : default_insta;

  return (
    <div className="profile-image">
      {isLoading ||
        (isLoadingDeleteState ? <LoadingSpinner /> : <img src={imageSrc} />)}
      <div>
        <h4>{userContext?.user.username}</h4>
        <h4 onClick={() => setShowModal(true)}>Change profile photo</h4>
        {image && (
          <button
            onClick={() => {
              if (userContext?.user.imageUrl) {
                deleteProfilePicture(userContext?.user.imageUrl);
              }
              handleImageUpload();
              setImage(undefined);
            }}
          >
            Update your profile picture
          </button>
        )}
      </div>
      <ChangePictureModal {...{ showModal, setShowModal, setImage, image }} />
    </div>
  );
}
