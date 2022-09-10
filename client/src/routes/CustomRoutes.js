import { Outlet, Navigate } from "react-router-dom";

function CustomRoutes() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return accessToken ? <Navigate to="/" /> : <Outlet />;
}

export default CustomRoutes;
