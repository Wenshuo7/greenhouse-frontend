import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";
import useGoogleSignup from "../hooks/useGoogleSignup";
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

export default function GoogleSignup() {
  const [user, setUser] = useState<GoogleAccessTokenResponse | null>(null);

  const { signup, message, error } = useGoogleSignup();

  const handleSignup = async (profile: GoogleUserProfile | null) => {
    await signup({
      username: profile?.email!,
      firstName: profile?.given_name!,
      lastName: profile?.family_name!,
      imageName: profile?.picture!,
    });
  };

  const onSignup = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
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
          handleSignup(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="google-signup">
      <button onClick={() => onSignup()}>Sign up with Google 🚀 </button>
      {error && <h1>{error}</h1>}
      {message && <Navigate to="/login" />}
    </div>
  );
}
