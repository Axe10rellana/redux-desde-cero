//react-redux
import { useSelector } from "react-redux";

//selectors
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../features/posts/postsSlice";

//components
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  //redux selectors
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //variables
  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
