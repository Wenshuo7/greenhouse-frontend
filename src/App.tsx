import "./App.css";
import { useEffect, useState } from "react";
import { FeedContainer } from "./components/feed/FeedContainer";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavigationBar } from "./components/navigation/NavigationBar";
import { Profile } from "./components/profile/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import useUserContenxt from "./hooks/useUserContext";
import { PostsContainer } from "./components/profile/PostsContainer";
import { PostDetails } from "./components/postDetails/PostDetails";
import { EditInfo } from "./components/profile/EditUserInfo";
import ChatContainer from "./components/chat/ChatContainer";
import NotificationMessagesWrapper from "./components/NotificationMessagesWrapper";
import NotificationsWrapper from "./components/NotificationsWrapper";
import ExploreContainer from "./components/explore/ExploreContainer";
import { useRemoveLocation } from "./context/locationContext";
import { useAddLocation } from "./context/locationContext";
import { useCurrentTheme } from "./context/themeContext";
import { UserType } from "./context/userContext";
import { useGetData } from "./hooks/useGetData";
import { useCookies } from "react-cookie";
import { url } from "./constants/api";

function App() {
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const userContext = useUserContenxt();
  const location = useLocation();
  const currentTheme = useCurrentTheme();
  const [user, setUser] = useState<UserType>();
  const { getData } = useGetData();
  const [cookies] = useCookies(["token", "user"]);

  const addLocation = useAddLocation();
  const removeLocation = useRemoveLocation();

  useEffect(() => {
    if (location.pathname.split("/").includes("profile")) {
      addLocation(location.pathname);
    } else if (!location.pathname.split("/").includes("p")) {
      removeLocation();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user?.id && cookies.token) {
      userContext?.dispatch({ type: "LOGIN", payload: user });
    }

    if (cookies?.user?.id) {
      getData({ url: `${url}/user/${cookies?.user?.id}`, setState: setUser });
    }
  }, [user?.id]);

  return (
    <div id={currentTheme} onClick={() => setToggleNotifications(false)}>
      {location.pathname.split("/").includes("login") ||
      location.pathname.split("/").includes("signup") ? null : (
        <NavigationBar {...{ toggleNotifications, setToggleNotifications }} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <NotificationsWrapper>
              <NotificationMessagesWrapper>
                <FeedContainer />
              </NotificationMessagesWrapper>
            </NotificationsWrapper>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route
          path="profile/:userId/"
          element={
            <NotificationMessagesWrapper>
              <Profile />
            </NotificationMessagesWrapper>
          }
        >
          <Route
            path="/profile/:userId/"
            element={<PostsContainer tab="posts" />}
          />
          <Route
            path="/profile/:userId/saved"
            element={<PostsContainer tab="saved" />}
          />
        </Route>
        <Route path="p/:id" element={<PostDetails />} />
        {userContext?.user && <Route path="/edit" element={<EditInfo />} />}
        {userContext?.user && (
          <Route path="inbox" element={<ChatContainer />} />
        )}
        <Route path="explore" element={<ExploreContainer />} />
      </Routes>
    </div>
  );
}

export default App;
