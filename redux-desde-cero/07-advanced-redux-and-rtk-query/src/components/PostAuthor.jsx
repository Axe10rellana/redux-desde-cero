//react redux
import { useSelector } from "react-redux";

//react router dom
import { Link } from "react-router-dom";

//selectors
import { selectAllUsers } from "../features/users/usersSlice";

const PostAuthor = ({ userId }) => {
  //redux selectors
  const users = useSelector(selectAllUsers);

  //variables
  const author = users.find((user) => user.id === userId);

  return (
    <span>
      By{" "}
      {author ? (
        <Link to={`/user/${userId}`}>{author.name}</Link>
      ) : (
        "Unknown author"
      )}
    </span>
  );
};

export default PostAuthor;
