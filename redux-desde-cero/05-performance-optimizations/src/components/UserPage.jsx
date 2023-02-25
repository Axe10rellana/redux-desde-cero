//react redux
import { useSelector } from "react-redux";

//react router dom
import { Link, useParams } from "react-router-dom";

//selectors
import { selectUserById } from "../features/users/usersSlice";
import { selectPostsByUser } from "../features/posts/postsSlice";

const UserPage = () => {
  //react router params
  const { userId } = useParams();

  //redux selectors
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //variables
  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitle = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitle}</ol>
    </section>
  );
};

export default UserPage;
