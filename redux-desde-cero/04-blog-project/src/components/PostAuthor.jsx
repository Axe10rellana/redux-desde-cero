//react redux
import { useSelector } from "react-redux";

//selectors
import { selectAllUsers } from "../features/users/usersSlice";

const PostAuthor = ({ userId }) => {
  //redux selectors
  const users = useSelector(selectAllUsers);

  //variables
  const author = users.find((user) => user.id === userId);

  return <span>By {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
