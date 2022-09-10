import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { accessToken } = localStorage;

  if (accessToken) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
