import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserType } from "../../context/userContext";
import useUserContext from "../../hooks/useUserContext";
import { useGetData } from "../../hooks/useGetData";
import { UsersListContainer } from "./UsersListContainer";
import { Edit } from "../feed/SvgsContainer";
import { Post } from "../feed/types/feedTypes";
import default_insta from "../../assets/default_insta.jpg";
import FollowButtonContainer from "./FollowButtonContainer";
import { url } from "../../constants/api";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Logout from "../../hooks/useLogout";

export const ProfileCard = () => {
  const [userInfo, setUserInfo] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [showFollowers, setShowFollowers] = useState<boolean>(false);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const userContext = useUserContext();

  const { userId } = useParams();
  const { getData } = useGetData();
  const { logout } = Logout();

  useEffect(() => {
    getData({
      url: `${url}/user/${userId}`,
      setState: setUserInfo,
    });
    getData({
      url: `${url}/posts/${userId}`,
      setState: setUserPosts,
    });
  }, [userId, userContext?.user?.following]);

  const imageSrc = userInfo?.authImage
    ? userInfo?.authImage
    : userInfo?.imageUrl
    ? `${url}/upload/${userInfo?.imageUrl}`
    : default_insta;

  return (
    <div className="profile-card">
      {showFollowers && (
        <UsersListContainer
          title={"Followers"}
          userIds={userInfo?.followers!}
          closeModal={setShowFollowers}
        />
      )}
      {showFollowing && (
        <UsersListContainer
          title={"Following"}
          userIds={userInfo?.following!}
          closeModal={setShowFollowing}
        />
      )}

      <img src={imageSrc} alt="img" />
      <div className="info-profile">
        <div className="info-followers">
          <h4>
            {userPosts?.length} {userPosts?.length === 1 ? "post" : "posts"}
          </h4>
          <h4 onClick={() => setShowFollowers(true)}>
            {userInfo?.followers?.length}{" "}
            {userInfo?.followers?.length === 1 ? "follower" : "followers"}
          </h4>
          <h4 onClick={() => setShowFollowing(true)}>
            {userInfo?.following?.length} following
          </h4>
          {userContext?.user?.id === userInfo?.id && (
            <div>
              {userContext?.user?.authImage ? null : (
                <Link to={`/edit`}>
                  <Edit />
                </Link>
              )}
              <ArrowLeftOnRectangleIcon onClick={logout} />
            </div>
          )}
        </div>
        <h2>{userInfo?.firstName + " " + userInfo?.lastName}</h2>
        {userContext?.user?.id === parseInt(userId!)
          ? null
          : userInfo && (
              <FollowButtonContainer {...{ setUserInfo, userInfo }} />
            )}
      </div>
    </div>
  );
};
