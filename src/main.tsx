import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { ChatDataProvider } from "./context/chatDataContext";
import { NotificationMessagesProvider } from "./context/notificationsMessagesContext";
import { NotificationsProvider } from "./context/notificationsContext";
import LocationProvider from "./context/locationContext";
import { ThemeProvider } from "./context/themeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { AuthWrapper } from "./components/AuthWrapper";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthWrapper>
      <CookiesProvider>
        <React.StrictMode>
          <GoogleOAuthProvider clientId="813271648723-u5r4unaa7mdjk4kglu2rouarg9njhl5n.apps.googleusercontent.com">
            <ThemeProvider>
              <NotificationsProvider initialNotificationsData={[]}>
                <NotificationMessagesProvider initialNotificationsData={[]}>
                  <ChatDataProvider initialChatData={[]}>
                    <UserContextProvider>
                      <LocationProvider initialLocation="/">
                        <App />
                      </LocationProvider>
                    </UserContextProvider>
                  </ChatDataProvider>
                </NotificationMessagesProvider>
              </NotificationsProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </React.StrictMode>
      </CookiesProvider>
    </AuthWrapper>
  </BrowserRouter>
);
