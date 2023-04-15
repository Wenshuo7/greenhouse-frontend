import fetcher from "../api/fetcher";
import { useState, useEffect } from "react";
import { UserType } from "../context/userContext";
import { url } from "../constants/api";

export default function useGetUsersById(
  userIds: (number | undefined)[] | undefined
) {
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await Promise.all(
      [...userIds!].map((id) => fetcher(`${url}/user/${id}`))
    );
    setUsers(users);
  };

  return { users };
}
