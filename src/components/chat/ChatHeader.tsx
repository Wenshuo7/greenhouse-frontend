import { url } from "../../constants/api";
import { UserType } from "../../context/userContext";
import default_insta from "../../assets/default_insta.jpg";

export default function ChatHeader({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: UserType | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}) {
  const imageSrc = selectedUser?.authImage
    ? selectedUser.authImage
    : selectedUser?.imageUrl
    ? `${url}/upload/${selectedUser?.imageUrl}`
    : default_insta;

  return (
    <div className={`private-chat-header ${selectedUser ? "activated" : ""}`}>
      {selectedUser && (
        <>
          <button
            onClick={() => {
              setSelectedUser(undefined);
            }}
            className={selectedUser.id ? "activated" : ""}
          >
            &#8592;
          </button>
          <img src={imageSrc} />
          <h4>{selectedUser?.firstName}</h4>
          <h4>{selectedUser?.lastName}</h4>
        </>
      )}
    </div>
  );
}
