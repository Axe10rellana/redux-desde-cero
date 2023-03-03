//react router dom
import { useLocation, Navigate, Outlet } from "react-router-dom";

//react redux
import { useSelector } from "react-redux";

//selectors
import { selectCurrentToken } from "../features/auth/authSlice";

const RequireAuth = () => {
  //selectors
  const token = useSelector(selectCurrentToken);

  //react router location
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
