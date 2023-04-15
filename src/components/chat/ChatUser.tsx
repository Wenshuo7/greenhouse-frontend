import { ChatUserProps } from "./types";
// import { socket } from '../../constants/socket';
import { useEffect, useState } from "react";
import { OnlineUsersData } from "./types";
import { useNewMessages } from "../../context/notificationsMessagesContext";
import { useDeleteNotificationMessages } from "../../context/notificationsMessagesContext";
import default_insta from "../../assets/default_insta.jpg";
import { socket } from "../../constants/socket";
import { url } from "../../constants/api";

export default function ChatUser({
  authImage,
  imageUrl,
  firstName,
  lastName,
  id,
  setSelectedUser,
  selectedUser,
}: ChatUserProps) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersData[]>([]);
  const newMessages = useNewMessages();
  const deleteNewMessages = useDeleteNotificationMessages();

  useEffect(() => {
    socket.emit("getOnlineUsers");
  }, [socket, selectedUser?.id]);

  useEffect(() => {
    socket.on("online-users", (data: OnlineUsersData[]) => {
      setOnlineUsers(data);
    });
    return () => {
      socket.off("online-users");
      socket.off("getOnlineusers");
    };
  }, [socket, selectedUser?.id]);

  const imageSrc = authImage
    ? authImage
    : imageUrl
    ? `${url}/upload/${imageUrl}`
    : default_insta;

  return (
    <div
      className={`user-card ${
        selectedUser?.firstName === firstName && "active"
      }`}
      onClick={() => {
        setSelectedUser();
        deleteNewMessages(id!);
      }}
    >
      <img src={imageSrc} alt="user" />
      <div>
        <div>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>

        {onlineUsers.find(({ userId }) => userId === id) ? (
          <div>
            <div className="green-circle"></div>
            {newMessages.find(({ senderId }) =>
              onlineUsers.find(({ userId }) => userId === senderId)
            ) ? (
              <p className="new-message">Sent you a message</p>
            ) : (
              <p>Active now</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
