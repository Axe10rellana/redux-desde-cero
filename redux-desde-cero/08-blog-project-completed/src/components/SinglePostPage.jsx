//react router dom
import { useParams, Link } from "react-router-dom";

//postsSlice querys
import { useGetPostsQuery } from "../features/posts/postsSlice";

//components
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import Loader from "./Loader";

const SinglePostPage = () => {
  //react router params
  const { postId } = useParams();

  //querys
  const { post, isLoading } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });

  //validations
  if (isLoading) return <Loader />;
  if (!post) {
    return (
      <section>
        <h2 className="ml-4">Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
