import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "../feed/types/feedTypes";

import ImageOverlay from "./ImageOverlay";
import { v4 as uuidv4 } from "uuid";
import { url } from "../../constants/api";
import LoadingSpinner from "../LoadingSpinner";
import useUserContext from "../../hooks/useUserContext";
import EmptyState from "./EmptyState";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCookies } from "react-cookie";

import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<Post[] | null>([]);
  const [error, setError] = useState("");
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useUserContext();
  const [cookies] = useCookies(["token"]);

  const headers =
    tab === "saved"
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        }
      : {};

  useEffect(() => {
    const getDataByUserId = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: `${url}/${tab}/${tab === "saved" ? "" : userId}`,
          headers,
        });

        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getDataByUserId();
  }, [tab, userId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={`${
        data?.length === 0 ? "empty-container" : "posts-container"
      }`}
    >
      {data?.length === 0 && tab === "saved" && (
        <h3>Only you can see what you've saved</h3>
      )}
      {data?.length === 0 && tab !== "saved" ? (
        <EmptyState {...{ isLoggedUser: userContext?.user?.id === userId }} />
      ) : null}

      {data &&
        data.map(({ imageUrl, likes, postId, types }) => {
          return (
            <Link key={uuidv4()} to={`/p/${postId}`}>
              <ImageOverlay {...{ likes }}>
                {types[0] === "image" ? (
                  <LazyLoadImage
                    src={`${url}/upload/${imageUrl[0]}`}
                    effect="blur"
                  />
                ) : (
                  <video
                    controls
                    className="video-details"
                    src={`${url}/upload/${imageUrl[0]}`}
                  ></video>
                )}
              </ImageOverlay>
            </Link>
          );
        })}
      {error && <h1>{error}</h1>}
    </div>
  );
};
