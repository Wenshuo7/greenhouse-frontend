import { SetStateAction, Dispatch } from "react";
export type CommentsContainerProps = {
  commentNotification: (value: string) => void;
  commentMessage: string;
};

export interface Comments {
  comment: string;
  post: string;
  userId: number;
  username: string;
  userImage: string;
  authImage: string;
  createdAt: string;
  likes: number[];
  id: number;
  postId: number;
}

export type CommentsCardProps = {
  userId: number;
  username: string;
  userImage: string;
  comment: string;
  createdAt: string;
  authImage: string;
  postId: number;
  likes: number[];
  id: number;
  setComments: Dispatch<SetStateAction<Comments[]>>;
};
