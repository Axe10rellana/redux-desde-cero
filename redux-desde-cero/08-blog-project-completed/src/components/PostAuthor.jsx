//react router dom
import { Link } from "react-router-dom";

//usersSlice querys
import { useGetUsersQuery } from "../features/users/usersSlice";

const PostAuthor = ({ userId }) => {
  //querys
  const { user: author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

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
