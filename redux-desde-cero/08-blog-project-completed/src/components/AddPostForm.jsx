//react
import { useState } from "react";

//react router dom
import { useNavigate } from "react-router-dom";

//react-icons
import { AiOutlineSave } from "react-icons/ai";

//postsSlice mutations
import { useAddNewPostMutation } from "../features/posts/postsSlice";

//usersSlice query
import { useGetUsersQuery } from "../features/users/usersSlice";

const AddPostForm = () => {
  //react router navigate
  const navigate = useNavigate();

  //mutations
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  //querys
  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  //state variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  //variables
  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  let usersOptions;
  if (isSuccess) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

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
      <h2 className="ml-4">Add a New Post</h2>
      <form className="mx-4 user-none">
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
        <button
          className="saveButton"
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          <AiOutlineSave />
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
