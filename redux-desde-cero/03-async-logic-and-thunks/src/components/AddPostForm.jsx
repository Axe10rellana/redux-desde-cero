//react
import { useState } from "react";

//react-redux
import { useDispatch, useSelector } from "react-redux";

//actions
import { addNewPost } from "../features/posts/postsSlice";

//selector
import { selectAllUsers } from "../features/users/usersSlice";

const AddPostForm = () => {
  //dispatch
  const dispatch = useDispatch();

  //redux state
  const users = useSelector(selectAllUsers);

  //state variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  //variables
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  //functions
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error(`Failed to save the post ${err}`);
      } finally {
        setAddRequestStatus("idle");
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
