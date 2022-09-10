import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  console.log(children, "children");
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  if (user || accessToken) {
    return <Navigate to="/" />;
  } else {
    console.log("private");
    return children;
  }
}

export default PrivateRoute;
