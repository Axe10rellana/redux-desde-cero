//react router dom
import { Link } from "react-router-dom";

//querys
import { useGetUsersQuery } from "../features/users/usersApiSlice";

//components
import Loader from "./Loader";

const UsersList = () => {
  //query variables
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  //variables
  let content;

  //validations
  if (isLoading) {
    content = (
      <section>
        <Loader />
      </section>
    );
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = (
      <section>
        <p>{JSON.stringify(error)}</p>
      </section>
    );
  }

  return content;
};

export default UsersList;
