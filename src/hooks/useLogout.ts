import { socket } from "../constants/socket";
import useUserContenxt from "./useUserContext";
import { useCookies } from "react-cookie";

export default function Logout() {
  const userContext = useUserContenxt();
  const [cookies, _, removeCookie] = useCookies(["token", "user"]);

  const logout = () => {
    userContext?.dispatch({ type: "LOGOUT", payload: undefined });
    removeCookie("token");
    removeCookie("user");
  };

  return { logout };
}
