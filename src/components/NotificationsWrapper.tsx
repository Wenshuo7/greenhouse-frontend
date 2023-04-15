import { ReactNode, useEffect } from "react";
import { useAddNotification } from "../context/notificationsContext";
// import { socket } from "../constants/socket";
import { Notification } from "../context/notificationsContext";
import useGetNotificationsData from "../hooks/useGetNotificationsData";
import useUserContext from "../hooks/useUserContext";
import { useNotifications } from "../context/notificationsContext";
import { socket } from "../constants/socket";
import { useCookies } from "react-cookie";

export default function NotificationsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const addNotification = useAddNotification();
  const { getNotificationsByReceiverId, error } = useGetNotificationsData();
  const userContext = useUserContext();

  useEffect(() => {
    if (userContext?.user?.id!) {
      getNotificationsByReceiverId(userContext?.user?.id!);
    }
  }, [userContext?.user?.id!]);

  useEffect(() => {
    socket.on("receive_notification", (data: Notification) => {
      addNotification(data);
    });

    return () => {
      socket.off("receive_notification");
    };
  }, []);

  return (
    <main>
      {error && error}
      {children}
    </main>
  );
}
