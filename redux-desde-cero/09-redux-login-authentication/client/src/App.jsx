//react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//components
import Layout from "./components/Layout";
import Login from "./components/Login";
import Public from "./components/Public";
import RequireAuth from "./components/RequireAuth";
import UsersList from "./components/UsersList";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
