import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useUserContext from "../../hooks/useUserContext";
import { MoonIcon } from "@heroicons/react/20/solid";
import { useToggleMode } from "../../context/themeContext";

export function FooterMenu({
  toggleMore,
}: {
  toggleMore?: boolean;
}): JSX.Element {
  const { logout } = useLogout();
  const userContext = useUserContext();
  const toggleMode = useToggleMode();

  return (
    <div
      className="footer-menu-section"
      style={{ display: `${toggleMore ? "flex" : ""}` }}
    >
      {userContext?.user?.id ? (
        <Link to="/" onClick={logout}>
          <h4>Logout</h4>
        </Link>
      ) : (
        <Link to={`/login`}>
          <h4>Login</h4>
        </Link>
      )}
      {userContext?.user?.id ? (
        <Link to={`profile/${userContext?.user?.id}`}>
          <h4>Profile</h4>
        </Link>
      ) : (
        <Link to={`/signup`}>
          <h4>Signup</h4>
        </Link>
      )}
      <div onClick={toggleMode}>
        <h4>Switch appearance</h4>
        <MoonIcon width="28px" height="28px" />
      </div>
    </div>
  );
}
