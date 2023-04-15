import { Dispatch, SetStateAction } from "react";

export type PostCardProps = {
  username: string;
  id: number;
  likes: number[];
  imageUrl: string[];
  text: string;
  createdAt: string;
  userImage: string;
  authImage: string;
  postId: number;
  index: number;
  types: string[];
  listRef: (node: HTMLDivElement | null) => void;
};

export interface FeedContainerProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[] | undefined>>;
  error: string;
}

export interface Post {
  id: number;
  text: string;
  imageUrl: string[];
  createdAt: string;
  likes: number[];
  username: string;
  postId: number;
  userImage: string;
  authImage: string;
  types: string[];
}
export type LikeButtonProps = {
  likes: number[];
  receiverId?: number;
  postId: number;
  updateComments?: () => void;
  updatePost?: () => void;
  url: string;
};
