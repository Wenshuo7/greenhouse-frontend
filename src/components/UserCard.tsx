import { Link, Navigate } from "react-router-dom";
import { useFollow } from "../hooks/useFollow";
import useUserContext from "../hooks/useUserContext";
import { FollowButton } from "./buttons/FollowButton";
import { MouseEvent } from "react";
import { url } from "../constants/api";
import default_insta from "../assets/default_insta.jpg";
import { socket } from "../constants/socket";

interface UserCardProps {
  id?: number | undefined;
  username?: string | undefined;
  imageUrl?: string | undefined;
  authImage?: string;
}

export const UserCard = ({
  id,
  imageUrl,
  username,
  authImage,
}: UserCardProps) => {
  const { changeFollowStatus, isLoading } = useFollow();
  const userContext = useUserContext();

  const isFollowed = userContext?.user?.following?.find(
    (userId) => userId === id
  );

  const imageSrc = authImage
    ? authImage
    : imageUrl
    ? `${url}/upload/${imageUrl}`
    : default_insta;

  return (
    <div className="users-container-profile">
      <Link to={`/profile/${id}`}>
        <div>
          <img src={imageSrc} />
          <p className="ellipsis">{username}</p>
        </div>
      </Link>
      {userContext?.user?.id === id ? null : (
        <FollowButton
          {...{ isLoading }}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            userContext?.user?.id ? (
              changeFollowStatus(id!)
            ) : (
              <Navigate to="login" />
            );
            {
              userContext?.user?.id
                ? socket.emit("send_notification", {
                    senderId: userContext?.user.id,
                    action: "follow",
                    receiverId: id,
                    message: `${
                      isFollowed
                        ? "is not following you anymore!"
                        : "started following you!"
                    }`,
                  })
                : () => {};
            }
          }}
        >
          {userContext?.user?.following?.find(
            (userToFollow) => userToFollow === id!
          )
            ? "Unfollow"
            : "Follow"}
        </FollowButton>
      )}
    </div>
  );
};
