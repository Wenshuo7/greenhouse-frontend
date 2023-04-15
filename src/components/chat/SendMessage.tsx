import TextField from "../TextField";
import { UserType } from "../../context/userContext";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import useCreateMessage from "../../hooks/useCreateMessage";
import { useAddMessage } from "../../context/chatDataContext";
import { socket } from "../../constants/socket";

export default function SendMessage({
  selectedUser,
}: {
  selectedUser: UserType;
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const { createMessage, errorMessage } = useCreateMessage();
  const userContext = useUserContext();
  const addMessage = useAddMessage();

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        receiverId: selectedUser?.id,
        senderId: userContext?.user?.id,
        members: [userContext?.user?.id, selectedUser?.id],
      };

      await socket.emit("send_message", messageData);
      await createMessage(messageData);
      addMessage(messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="send-container">
      {errorMessage && <h1>{errorMessage}</h1>}
      <TextField
        className="chat-input"
        value={currentMessage}
        onChange={(currentMessage) => setCurrentMessage(currentMessage)}
      />
      {currentMessage ? (
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
