import React, { MouseEvent } from "react";
import Button from "./Button";

export const FollowButton = ({
  children,
  onClick = () => {},
  isLoading,
}: {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}) => {
  return (
    <Button className="follow-btn" onClick={onClick}>
      {isLoading ? "Loading..." : children}
    </Button>
  );
};
