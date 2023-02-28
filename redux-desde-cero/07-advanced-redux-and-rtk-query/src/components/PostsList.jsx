//react redux
import { useSelector } from "react-redux";

//selectors
import { selectPostIds } from "../features/posts/postsSlice";

//components
import PostsExcerpt from "./PostsExcerpt";

//postSlice hooks
import { useGetPostsQuery } from "../features/posts/postsSlice";

const PostsList = () => {
  //hooks variables
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  //redux selectors
  const orderedPostIds = useSelector(selectPostIds);

  //variables
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
