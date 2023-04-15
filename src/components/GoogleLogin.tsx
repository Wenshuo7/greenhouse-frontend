import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";
import useGoogleSignin from "../hooks/useGoogleLogin";
import { Navigate } from "react-router-dom";

interface GoogleAccessTokenResponse {
  access_token: string; // The access token string
  expires_in: number; // The number of seconds until the access token expires
  token_type: string; // The type of token (e.g. "Bearer")
  scope: string; // The scope of the access token
  authuser?: string; // The authorized user's ID (if applicable)
  prompt: string; // The prompt value (if applicable)
}

type GoogleUserProfile = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export default function GoogleLogin() {
  const [user, setUser] = useState<GoogleAccessTokenResponse | null>(null);
  const { login, message, error } = useGoogleSignin();

  const handleLogin = async (profile: GoogleUserProfile | null) => {
    await login({
      username: profile?.email!,
      token: user?.access_token!,
    });
  };

  const onLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },

    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          handleLogin(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="google-login">
      <button onClick={() => onLogin()}>Login with Google 🚀 </button>
      {error && <h4>{error}</h4>}
      {message && <Navigate to="/" />}
    </div>
  );
}
