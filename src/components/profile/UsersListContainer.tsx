import { UserCard } from "../UserCard";
import { UserType } from "../../context/userContext";
import useGetUsersById from "../../hooks/useGetUsersById";

export const UsersListContainer = ({
  userIds,
  closeModal,
  title,
}: {
  userIds: (number | undefined)[];
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  const { users } = useGetUsersById(userIds);

  return (
    <div onClick={() => closeModal(false)} className="users-container-list">
      <div className="users-list-content">
        <header>
          <h1>{title}</h1>
          <h1>X</h1>
        </header>

        {users?.map((user) => (
          <UserCard key={user?.id} {...user} />
        ))}
      </div>
    </div>
  );
};
