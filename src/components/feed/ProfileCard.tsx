import { url } from "../../constants/api";
import useUserContext from "../../hooks/useUserContext";
import { Link } from "react-router-dom";
import default_insta from "../../assets/default_insta.jpg";

export default function ProfileCard() {
  const userContext = useUserContext();

  const imageSrc = userContext?.user?.authImage
    ? userContext?.user?.authImage
    : userContext?.user?.imageUrl
    ? `${url}/upload/${userContext?.user?.imageUrl}`
    : default_insta;

  return (
    <div className="profile-feed-card">
      <div className="banner"></div>
      <div className="info-section">
        <Link to={`profile/${userContext?.user?.id}`}>
          <h1>{userContext?.user?.username}</h1>
        </Link>
        <img src={imageSrc} className="info-profile-img" />
      </div>
    </div>
  );
}
