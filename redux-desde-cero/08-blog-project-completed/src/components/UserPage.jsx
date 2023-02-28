//react router dom
import { Link, useParams } from "react-router-dom";

//postsSlice querys
import { useGetPostsByUserIdQuery } from "../features/posts/postsSlice";

//usersSlice querys
import { useGetUsersQuery } from "../features/users/usersSlice";

//components
import Loader from "./Loader";

const UserPage = () => {
  //react router params
  const { userId } = useParams();

  //querys
  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  //variables
  let content;
  if (isLoading || isLoadingUser) {
    content = <Loader />;
  } else if (isSuccess && isSuccessUser) {
    const { ids, entities } = postsForUser;
    content = (
      <>
        <h2 className="ml-4">{user?.name}</h2>
        <ol className="list-none mx-4 borderTable">
          {ids.map((id) => (
            <li className="listTable" key={id}>
              <Link className="itemTable" to={`/post/${id}`}>
                {entities[id].title}
              </Link>
            </li>
          ))}
        </ol>
      </>
    );
  } else if (isError || isErrorUser) {
    content = <p className="errorMessage">{error || errorUser}</p>;
  }

  return <section>{content}</section>;
};

export default UserPage;
