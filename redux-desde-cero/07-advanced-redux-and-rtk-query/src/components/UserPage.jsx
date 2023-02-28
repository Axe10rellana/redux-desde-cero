//react redux
import { useSelector } from "react-redux";

//react router dom
import { Link, useParams } from "react-router-dom";

//selectors
import { selectUserById } from "../features/users/usersSlice";

//postsSlice hooks
import { useGetPostsByUserIdQuery } from "../features/posts/postsSlice";

const UserPage = () => {
  //react router params
  const { userId } = useParams();

  //redux selectors
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //hooks variables
  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  //variables
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
