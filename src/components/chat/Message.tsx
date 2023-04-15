import useUserContext from "../../hooks/useUserContext";
import { MessageProps } from "./types";
import { useEffect, useRef } from "react";
import { useChatData } from "../../context/chatDataContext";
import default_insta from "../../assets/default_insta.jpg";
import { url } from "../../constants/api";

export default function Message({
  message,
  senderId,
  selectedUser,
}: MessageProps) {
  const userContext = useUserContext();
  const chatData = useChatData();
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const senderSrc = userContext?.user?.authImage
    ? userContext?.user?.authImage
    : userContext?.user?.imageUrl
    ? `${url}/upload/${userContext?.user?.imageUrl}`
    : default_insta;

  const receiverSrc = selectedUser?.authImage
    ? selectedUser?.authImage
    : selectedUser?.imageUrl
    ? `${url}/upload/${selectedUser?.imageUrl}`
    : default_insta;

  return (
    <div
      className={`chat-box ${
        userContext?.user?.id === senderId ? "user" : "guest"
      }`}
      ref={bottomRef}
    >
      <img src={userContext?.user?.id === senderId ? senderSrc : receiverSrc} />
      <h4>{message}</h4>
    </div>
  );
}
