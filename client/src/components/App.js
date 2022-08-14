import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./pages/Loader";
import Login from "./pages/Login";
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));
const OtpVerification = React.lazy(() => import("./pages/OtpVerification"));
const ForgotPasswordEmailVerification = React.lazy(() =>
  import("./pages/ForgotPasswordEmailVerification")
);
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/verifyUser/:id" element={<OtpVerification />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/email_verification"
              element={<ForgotPasswordEmailVerification />}
            />
            <Route path="/reset_password/:id" element={<ResetPassword />} />
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
