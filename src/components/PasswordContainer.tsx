import { Dispatch, SetStateAction, useState } from "react";

export default function PasswordContainer({
  password,
  setPassword,
}: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} className="password-form">
      <h2>Password</h2>
      <input
        onFocus={() => setIsPasswordModalOpen(true)}
        onBlur={() => setIsPasswordModalOpen(false)}
        type="password"
        className="text-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isPasswordModalOpen && (
        <div
          className="password-modal"
          onClick={() => setIsPasswordModalOpen(false)}
        >
          <h1>Your password needs to:</h1>
          <ul>
            <li>include both lower and uppercase characters.</li>
            <li>include at least one number and symbol.</li>
            <li>be at least 8 characters long</li>
          </ul>
        </div>
      )}
    </div>
  );
}
