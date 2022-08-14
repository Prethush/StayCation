import { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailVerifiaction, reset } from "../../slices/auth";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function ForgotPasswordEmailVerification() {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    if (message.length) {
      if (!status) {
        toast.error(message);
        dispatch(reset());
      } else {
        toast.success(message);
        dispatch(reset());
        // const user = JSON.parse(localStorage.getItem("user"));
        // navigate(`/reset_password/${user._id}`);
      }
    }
  }, [dispatch, message, status, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { email };
    dispatch(emailVerifiaction(obj));
  };
  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#696880" }}
    >
      <div className="form-container" style={{ width: "30vw" }}>
        <Form
          className="p-5 rounded bg-white"
          style={{
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <legend className="text-center">Forgot Password</legend>
          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={!validEmail}
          >
            Send Verification Code
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordEmailVerification;
