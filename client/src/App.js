import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomRoutes from "./routes/CustomRoutes";
const Login = React.lazy(() => import("./pages/User/Login"));
const Register = React.lazy(() => import("./pages/User/Register"));
const Home = React.lazy(() => import("./pages/User/Home"));
const OtpVerification = React.lazy(() =>
  import("./pages/User/OtpVerification")
);
const ForgotPasswordEmailVerification = React.lazy(() =>
  import("./pages/User/ForgotPasswordEmailVerification")
);
const ResetPassword = React.lazy(() => import("./pages/User/ResetPassword"));
const AdminLogin = React.lazy(() => import("./pages/Admin/Login"));
const Profile = React.lazy(() => import("./pages/User/Profile"));
function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route element={<CustomRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verifyUser/:id" element={<OtpVerification />} />
              <Route path="/reset_password/:id" element={<ResetPassword />} />
              <Route
                path="/email_verification"
                element={<ForgotPasswordEmailVerification />}
              />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/user/profile/:id" element={<Profile />} />
            <Route path="/admin_login" element={<AdminLogin />} />
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
