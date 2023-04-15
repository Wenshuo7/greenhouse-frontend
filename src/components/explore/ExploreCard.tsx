const cardSize = ["card_small", "card_medium", "card_large"];
import { Link } from "react-router-dom";
import { url } from "../../constants/api";

export default function ExploreCard({
  imageUrl,
  postId,
  types,
}: {
  imageUrl: string[];
  postId: number;
  types: string[];
}) {
  return (
    <div
      className={`card-explore ${
        cardSize[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
      }`}
    >
      <Link to={`/p/${postId}`}>
        {types[0] === "image" ? (
          <img src={`${url}/upload/${imageUrl[0]}`} alt="user-image" />
        ) : (
          <video
            className="explore-video"
            src={`${url}/upload/${imageUrl[0]}`}
            controls
          ></video>
        )}
      </Link>
    </div>
  );
}
