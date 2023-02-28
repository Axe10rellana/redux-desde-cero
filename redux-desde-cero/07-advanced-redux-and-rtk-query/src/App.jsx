//react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//components
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import Layout from "./components/Layout";
import PostsList from "./components/PostsList";
import SinglePostPage from "./components/SinglePostPage";
import UserPage from "./components/UserPage";
import UsersList from "./components/UsersList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
