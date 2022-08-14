import { useSelector } from "react-redux";

function ProtectedRoute({children}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useSelector((state) => state.auth);

  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
