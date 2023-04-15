import { FollowButton } from "../buttons/FollowButton";
import useUserContext from "../../hooks/useUserContext";
import { UserType } from "../../context/userContext";
import { useFollow } from "../../hooks/useFollow";
import { useParams } from "react-router-dom";
import { socket } from "../../constants/socket";

export default function FollowButtonContainer({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}) {
  const userContext = useUserContext();

  const { changeFollowStatus } = useFollow();
  const { userId } = useParams();
  const isFollowed = userContext?.user?.following?.find(
    (user) => user === parseInt(userId!)
  );

  const sendNotification = () => {
    socket.emit("send_notification", {
      senderId: userContext?.user.id,
      action: "follow",
      receiverId: userInfo?.id,
      message: `${
        isFollowed ? "is not following you anymore!" : "started following you!"
      }`,
    });
  };

  const setUserFollowers = () => {
    return userContext?.user?.id
      ? setUserInfo((prevInfo) => {
          return {
            ...prevInfo,
            followers: prevInfo?.followers?.find(
              (userToFollow) => userToFollow === userContext?.user?.id!
            )
              ? prevInfo?.followers.filter(
                  (userToFollow) => userToFollow !== userContext?.user?.id
                )
              : [...prevInfo?.followers!, userContext?.user?.id],
          };
        })
      : null;
  };

  return (
    <FollowButton
      onClick={() => {
        changeFollowStatus(userInfo?.id!);
        setUserFollowers();
        userContext?.user?.id ? sendNotification() : () => {};
      }}
    >
      {userContext?.user?.following?.find(
        (userToFollow) => userToFollow === parseInt(userId!)
      )
        ? "Unfollow"
        : "Follow"}
    </FollowButton>
  );
}
