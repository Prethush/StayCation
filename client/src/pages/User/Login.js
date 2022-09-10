import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../slices/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (message.length) {
      if (!status) {
        toast.error(message);
        dispatch(reset());
      } else {
        toast.success(message);
        dispatch(reset());
        navigate("/");
      }
    }
  }, [dispatch, message, navigate, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { email, pwd };
    dispatch(login(obj));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container col-md-6 col-lg-5 col-xl-3">
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded bg-white"
          style={{
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <legend className="text-center">Login Form</legend>
          {/* Email Field */}
          <fieldset className="mb-3" id="formBasicEmail">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              placeholder="Enter email"
              id="email"
              ref={emailRef}
              name="email"
              className="form-control mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          {/* Password Field */}
          <fieldset className="mb-3" id="formBasicPassword">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="pwd"
              id="pwd"
              className="form-control mt-2"
              onChange={(e) => setPwd(e.target.value)}
            />
          </fieldset>
          <button
            className="w-100 btn text-white"
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#FF3366" }}
            disabled={!email || !pwd}
          >
            Login
          </button>
          <Link
            to="/email_verification"
            className="text-decoration-none text-center d-block mt-2"
            style={{ color: "#FF3366" }}
          >
            <span>Forgot Password</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
