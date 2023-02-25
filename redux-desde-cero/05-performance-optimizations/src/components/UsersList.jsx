//react redux
import { useSelector } from "react-redux";

//react router dom
import { Link } from "react-router-dom";

//selectors
import { selectAllUsers } from "../features/users/usersSlice";

const UsersList = () => {
  //redux selectors
  const users = useSelector(selectAllUsers);

  //variables
  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
