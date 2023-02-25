//react redux
import { useSelector } from "react-redux";

//react router dom
import { useParams, Link } from "react-router-dom";

//selectors
import { selectPostById } from "../features/posts/postsSlice";

//components
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const SinglePostPage = () => {
  //react router params
  const { postId } = useParams();

  //redux selectors
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  //validations
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
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
