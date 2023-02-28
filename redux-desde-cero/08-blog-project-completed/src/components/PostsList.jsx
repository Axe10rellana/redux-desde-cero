//components
import PostsExcerpt from "./PostsExcerpt";
import Loader from "./Loader";

//postSlice querys
import { useGetPostsQuery } from "../features/posts/postsSlice";

const PostsList = () => {
  //querys
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("getPosts");

  //variables
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = posts.ids.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p className="errorMessage">{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
