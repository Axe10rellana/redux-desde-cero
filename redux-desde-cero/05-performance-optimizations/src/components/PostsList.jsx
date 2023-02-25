//react-redux
import { useSelector } from "react-redux";

//selectors
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "../features/posts/postsSlice";

//components
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  //redux selectors
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //variables
  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
