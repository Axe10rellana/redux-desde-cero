//react
import { useState, useEffect } from "react";

//react router dom
import { useParams, useNavigate } from "react-router-dom";

//react icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";

//sweetalert2
import Swal from "sweetalert2";

//postsSlice querys
import { useGetPostsQuery } from "../features/posts/postsSlice";

//usersSlice querys
import { useGetUsersQuery } from "../features/users/usersSlice";

//postsSlice mutations
import {
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../features/posts/postsSlice";

//components
import Loader from "./Loader";

const EditPostForm = () => {
  //react router params
  const { postId } = useParams();

  //react router navigate
  const navigate = useNavigate();

  //mutations
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  //querys
  const {
    post,
    isLoading: isLoadingPost,
    isSuccess,
  } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      post: data?.entities[postId],
      isLoading,
      isSuccess,
    }),
  });
  const { data: users, isSuccess: isSuccessUsers } =
    useGetUsersQuery("getUsers");

  //state variables
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  //useEffect
  useEffect(() => {
    if (isSuccess) {
      setTitle(post.title);
      setContent(post.body);
      setUserId(post.userId);
    }
  }, [isSuccess, post?.title, post?.body, post?.userId]);

  //variables
  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  let usersOptions;

  //validations
  if (isLoadingPost) return <Loader />;
  if (!post) {
    return (
      <section>
        <h2 className="ml-4">Post not found!</h2>
      </section>
    );
  }
  if (isSuccessUsers) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  //functions
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post?.id,
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
  const onDeletePostClicked = () => {
    Swal.fire({
      icon: "error",
      title: "Warning",
      text: "Do you want to remove this post?",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "#3b82f6",
      confirmButtonText: "Yes",
      confirmButtonColor: "#ef4444",
    }).then((response) => {
      if (response.isConfirmed) {
        deletePost({ id: post?.id }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } else if (response.isDenied) {
        return;
      }
    });
  };

  return (
    <section>
      <h2 className="ml-4">Edit Post</h2>
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
        <div className="flex justify-between items-center">
          <button
            className="saveButton"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            <MdOutlineEditNote />
          </button>
          <button
            className="deleteButton"
            type="button"
            onClick={onDeletePostClicked}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
