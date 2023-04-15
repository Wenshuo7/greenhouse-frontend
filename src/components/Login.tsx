import TextField from "./TextField";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link, Navigate } from "react-router-dom";

import FacebookButton from "./FacebookButton";
import LoadingSpinner from "./LoadingSpinner";

import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const { login, isLoading, error, message } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Greenhouse</h1>
        <h4>Username</h4>
        <TextField
          className="text-field"
          value={username}
          onChange={(username) => setUsername(username)}
        />
        <h4>Password</h4>
        <input
          className="text-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!username || !password}
          style={{
            color: `${!username || !password ? "white" : "black"}`,
          }}
          className="login-btn"
        >
          Log In
        </button>
        {isLoading && <LoadingSpinner />}
        {message && <Navigate to="/" />}
        {error && <h4>{error}</h4>}
      </form>

      <GoogleLogin />
      <footer className="footer-container">
        <h4>
          Don't have an account?<Link to="/signup">Sign up</Link>
        </h4>
      </footer>
    </div>
  );
}
