import { createContext, useReducer, useEffect, useState } from "react";
import { Post } from "../components/feed/types/feedTypes";
import useLogout from "../hooks/useLogout";
import { useCookies } from "react-cookie";
import { useGetData } from "../hooks/useGetData";
import { url } from "../constants/api";

export type UserType = {
  id?: number | undefined;
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  imageUrl?: string | undefined;
  followers?: (number | undefined)[];
  following?: (number | undefined)[];
  saved?: number[];
  authImage?: string;
};

interface UserContextInterface {
  user: UserType;
  dispatch: (action: ActionType) => void;
}

type ActionType =
  | { type: "LOGIN"; payload: UserType }
  | { type: "LOGOUT"; payload: undefined | string }
  | {
      type: "UPDATE_FOLLOWING";
      payload: { userId: number };
    }
  | {
      type: "UPDATE_SAVED";
      payload: { postId: number };
    };

interface UserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}
export const UserContext = createContext<UserContextInterface | null>(null);

export const userReducer = (state: any, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { user: payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_FOLLOWING":
      return {
        user: {
          ...state.user,
          following: state.user.following?.find(
            (id: number) => id === action.payload.userId
          )
            ? state.user.following?.filter(
                (id: number) => id !== action.payload.userId
              )
            : [...state.user.following, action.payload.userId],
        },
      };
    case "UPDATE_SAVED":
      return {
        user: {
          ...state.user,
          saved: state.user.saved?.find(
            (id: number) => id === action.payload.postId
          )
            ? state.user.saved?.filter(
                (id: number) => id !== action.payload.postId
              )
            : [...state.user.saved, action.payload.postId],
        },
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  const { getData } = useGetData();

  // console.log(user);
  const { logout } = useLogout();

  const [cookies, setCookie] = useCookies(["token", "user"]);

  useEffect(() => {
    if (!cookies.token) {
      logout();
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
