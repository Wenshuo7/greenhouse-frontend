import { useEffect } from "react";
import { useNotifications } from "../../context/notificationsContext";
export default function NotificaitonsNavContainer() {
  const notifications = useNotifications();

  const numberOfUnreadNotifications = notifications.filter(
    (notification) => notification.read === 0
  );

  useEffect(() => {}, [notifications?.length]);

  return numberOfUnreadNotifications.length === 0 ? null : (
    <div className="notification-msg">{numberOfUnreadNotifications.length}</div>
  );
}
