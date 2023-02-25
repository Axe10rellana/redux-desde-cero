//react-redux
import { useSelector, useDispatch } from "react-redux";

//react
import { useEffect } from "react";

//selectors
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../features/posts/postsSlice";

//thunks
import { fetchPosts } from "../features/posts/postsSlice";

//components
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  //dispatch
  const dispatch = useDispatch();

  //redux state
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //useEffect
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

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

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
