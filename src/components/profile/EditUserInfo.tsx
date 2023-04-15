import { FormEvent, useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import TextField from "../TextField";
import useEditInfo from "../../hooks/useEditInfo";
import { Navigate } from "react-router-dom";
import Button from "../buttons/Button";
import UploadProfilePicture from "./UpdateProfilePicture";
import LoadingSpinner from "../LoadingSpinner";

export const EditInfo = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const userContext = useUserContext();
  const { editInfo, error, isLoading, message } = useEditInfo();

  useEffect(() => {
    setUsername(userContext?.user.username!);
    setFirstName(userContext?.user.firstName!);
    setLastName(userContext?.user.lastName!);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await editInfo(username, firstName, lastName);
  }
  if (isLoading) <LoadingSpinner />;

  return (
    <div className="edit-container">
      {error && <h3>{error}</h3>}
      <UploadProfilePicture />
      <form className="edit-form" onSubmit={handleSubmit}>
        <div>
          <h3>Username</h3>
          <TextField
            className="username"
            value={username}
            onChange={(username) => setUsername(username)}
          />
        </div>
        <div>
          <h3>First Name</h3>
          <TextField
            className="fistName"
            value={firstName}
            onChange={(firstName) => setFirstName(firstName)}
          />
        </div>
        <div>
          <h3>Last Name</h3>
          <TextField
            className="lastName"
            value={lastName}
            onChange={(lastName) => setLastName(lastName)}
          />
        </div>
        <Button className="primary-btn">
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
      {message && <Navigate to={`/profile/${userContext?.user.id}`} />}
    </div>
  );
};
