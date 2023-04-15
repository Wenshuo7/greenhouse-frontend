import { Link } from "react-router-dom";
import { NavigationLinkProps } from "./types";
import { Dispatch, SetStateAction } from "react";
import useUserContext from "../../hooks/useUserContext";
import MessagesNavContainer from "./MessagesNavContainer";
import NotificaitonsNavContainer from "./NotificationsNavContainer";
import { useFilterNotifications } from "../../context/notificationsContext";
import useUpdateNotifications from "../../hooks/useUpdateNotifications";
import default_insta from "../../assets/default_insta.jpg";
import { url as apiUrl } from "../../constants/api";

export const NavigationLink = ({
  title,
  link,
  url,
  toggleCreatePost,
  toggleNotifications,
  index,
  setSelectedIndex,
  selectedIndex,
  SvgIcon,
}: NavigationLinkProps): JSX.Element => {
  const userContext = useUserContext();
  const filterNotifications = useFilterNotifications();
  const { updateNotifications } = useUpdateNotifications();

  const imageSrc = userContext?.user?.authImage
    ? userContext?.user?.authImage
    : userContext?.user?.imageUrl
    ? `${apiUrl}/upload/${userContext?.user?.imageUrl}`
    : default_insta;

  return (
    <Link
      to={link === "profile" ? `${link}/${userContext?.user?.id}` : link}
      className={
        (title === "Notifications" ? "notification-link" : "") ||
        (title === "Profile" ? "profile-link" : "")
      }
      onClick={(e) => {
        (title === "Create" &&
          (toggleCreatePost(), e.stopPropagation(), e.preventDefault())) ||
          (title === "Notifications" &&
            (filterNotifications(),
            updateNotifications(userContext?.user?.id!),
            toggleNotifications(),
            e.stopPropagation(),
            e.preventDefault()));
        setSelectedIndex(index);
      }}
    >
      <li className={selectedIndex === index ? "active" : ""}>
        <div>
          {title === "Profile" ? (
            <img src={imageSrc} />
          ) : (
            SvgIcon && <SvgIcon width="32px" height="32px" />
          )}
          {title === "Messages" && <MessagesNavContainer />}
          {title === "Notifications" && <NotificaitonsNavContainer />}
        </div>
        <h3>{title}</h3>
      </li>
    </Link>
  );
};
