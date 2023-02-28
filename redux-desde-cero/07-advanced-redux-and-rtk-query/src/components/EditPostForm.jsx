//react
import { useState } from "react";

//react redux
import { useSelector } from "react-redux";

//react router dom
import { useParams, useNavigate } from "react-router-dom";

//selectors
import { selectPostById } from "../features/posts/postsSlice";
import { selectAllUsers } from "../features/users/usersSlice";

//postsSlice hooks
import {
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../features/posts/postsSlice";

const EditPostForm = () => {
  //react router params
  const { postId } = useParams();

  //react router navigate
  const navigate = useNavigate();

  //hooks variables
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  //redux selectors
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  //state variables
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  //validations
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  //variables
  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  //functions
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error(`Failed to save the post ${err}`);
      }
    }
  };
  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error(`Failed to delete the post ${err}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <input
          type="text"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder="Write a title"
          autoComplete="off"
          required
        />
        <select defaultValue={userId} onChange={onAuthorChanged}>
          <option value="">Select an author</option>
          {usersOptions}
        </select>
        <textarea
          className="resize"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          placeholder="Write a comment"
          autoComplete="off"
          required
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
