import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";

type NotificatonCardProps = {
  sender: number;
  message: string;
  createdAt: string;
};
import default_insta from "../../assets/default_insta.jpg";
import { useEffect, useState } from "react";
import { UserType } from "../../context/userContext";
import { url } from "../../constants/api";
import LoadingSpinner from "../LoadingSpinner";

export default function NotificationCard({
  sender,
  message,
  createdAt,
}: NotificatonCardProps) {
  const [user, setUser] = useState<UserType>();
  const { getData, isLoading } = useGetData();

  useEffect(() => {
    getData({ url: `${url}/user/${sender}`, setState: setUser });
  }, [user?.id]);

  const imageSrc = user?.authImage
    ? user.authImage
    : user?.imageUrl
    ? `${url}/upload/${user?.imageUrl}`
    : default_insta;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div onClick={(e) => e.stopPropagation()} className="notification-card">
      <img src={imageSrc} />

      <div className="notification-content">
        <Link to={`/profile/${user?.id}`}>
          <p>
            {`${user?.username} ${message} ${
              createdAt
                ? formatDistanceToNow(new Date(createdAt).getTime(), {
                    addSuffix: true,
                  })
                : ""
            }`}
          </p>
        </Link>
      </div>
    </div>
  );
}
