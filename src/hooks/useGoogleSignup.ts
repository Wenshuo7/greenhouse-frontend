import { useState } from "react";
import { url } from "../constants/api";

export default function useGoogleSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const signup = async ({
    username,
    firstName,
    lastName,
    imageName,
  }: {
    username: string;
    firstName: string;
    lastName: string;
    imageName: string;
  }) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, firstName, lastName, imageName }),
      });

      const json = await res.json();

      if (json.error) {
        setError(json.error);
      } else {
        setMessage(json.message);
      }
    } catch (err) {
      setError("Something went wrong");
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
    message,
  };
}
