//react router dom
import { Link } from "react-router-dom";

//usersSlice querys
import { useGetUsersQuery } from "../features/users/usersSlice";

//components
import Loader from "./Loader";

const UsersList = () => {
  //querys
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  //variables
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((userId) => (
      <li className="listTable" key={userId}>
        <Link className="itemTable" to={`/user/${userId}`}>
          {users.entities[userId].name}
        </Link>
      </li>
    ));
    content = (
      <>
        <h2 className="ml-4">Users</h2>
        <ul className="list-none mx-4 borderTable">{renderedUsers}</ul>
      </>
    );
  } else if (isError) {
    content = <p className="errorMessage">{error}</p>;
  }

  return <section>{content}</section>;
};

export default UsersList;
