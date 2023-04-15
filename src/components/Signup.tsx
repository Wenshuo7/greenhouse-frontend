import TextField from "./TextField";
import useSignup from "../hooks/useSignup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PasswordContainer from "./PasswordContainer";
import { Navigate } from "react-router-dom";
import GoogleSignup from "./GoogleSignup";

export default function Signup() {
  const { signup, isLoading, error, message } = useSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("imageUrl", image!);
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("username", username);
    formData.set("password", password);
    formData.set("imageName", image?.name!);

    await signup(formData);
  };

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImage(evt.target.files[0]);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Greenhouse</h1>
        <h4>Username</h4>
        <TextField
          className="text-field"
          value={username}
          onChange={(username) => setUsername(username)}
        />
        <PasswordContainer {...{ password, setPassword }} />
        <h4>First Name</h4>
        <TextField
          className="text-field"
          value={firstName}
          onChange={(firstname) => setFirstName(firstname)}
        />
        <h4>Last Name</h4>
        <TextField
          className="text-field"
          value={lastName}
          onChange={(lastName) => setLastName(lastName)}
        />
        <h4>Upload Profile Picture</h4>
        <input
          onChange={(e) => handleImageUpload(e)}
          type="file"
          name="img"
          id="actual-btn"
          style={{ display: "none" }}
        />
        <label htmlFor="actual-btn" className="choose-img">
          Choose Image
        </label>
        <button
          type="submit"
          disabled={!username || !password || !firstName || !lastName || !image}
          style={{
            color: `${
              !username || !password || !firstName || !lastName || !image
                ? "white"
                : "black"
            }`,
          }}
          className="register-btn"
        >
          Register
        </button>
      </form>
      {error && <h4 className="error-signup">{error}</h4>}
      {message && <Navigate to="/login" />}
      {isLoading && <LoadingSpinner className="signup-spinner" />}
      <GoogleSignup />
      <footer className="footer-container">
        <h4>
          Already have an account{" "}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </h4>
      </footer>
    </div>
  );
}
