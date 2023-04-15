import { UserType } from "../../../context/userContext";

export interface ChatUserProps {
  imageUrl?: string | undefined;
  authImage?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  setSelectedUser: () => void;
  selectedUser: UserType | undefined;
  id?: number;
}

export type MessageProps = {
  message: string | undefined;
  senderId: number | undefined;
  selectedUser: UserType | undefined;
  index: number;
};

export type OnlineUsersData = {
  userId: number;
  socketId: string;
};
