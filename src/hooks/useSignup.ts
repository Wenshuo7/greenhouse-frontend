import { useState } from "react";
import { url } from "../constants/api";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const signup = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${url}/user/signup`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.error) {
        setError(error);
      } else {
        setMessage(json.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
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
