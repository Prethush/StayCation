import { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
        navigate("/home");
      }
    }
  }, [dispatch, message, navigate, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { email, pwd };
    dispatch(login(obj));
  };
  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#696880" }}
    >
      <div className="form-container" style={{ width: "30vw" }}>
        <Form
          onSubmit={handleSubmit}
          className="p-5 rounded bg-white"
          style={{
            margin: "0 auto",
          }}
        >
          <legend className="text-center">Login Form</legend>
          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="pwd"
              onChange={(e) => setPwd(e.target.value)}
            />
          </Form.Group>
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={!email || !pwd}
          >
            Login
          </Button>
          <Link
            to="/email_verification"
            className="text-decoration-none text-center d-block mt-2"
          >
            <span>Forgot Password</span>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
