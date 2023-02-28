//react
import { useState } from "react";

//react redux
import { useSelector } from "react-redux";

//react router dom
import { useNavigate } from "react-router-dom";

//postsSlice hooks
import { useAddNewPostMutation } from "../features/posts/postsSlice";

//selectors
import { selectAllUsers } from "../features/users/usersSlice";

const AddPostForm = () => {
  //react router navigate
  const navigate = useNavigate();

  //hooks variables
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  //redux selectors
  const users = useSelector(selectAllUsers);

  //state variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

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
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error(`Failed to save the post ${err}`);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <select value={userId} onChange={onAuthorChanged}>
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
      </form>
    </section>
  );
};

export default AddPostForm;
