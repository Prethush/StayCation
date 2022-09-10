import { useState, useRef, useEffect } from "react";
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
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container col-sm-6 col-lg-4 col-xl-3">
        <form
          className="p-5 rounded bg-white"
          style={{
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          onSubmit={handleSubmit}
        >
          <legend className="text-center">Forgot Password</legend>
          {/* Email Field */}
          <fieldset className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              id="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-2"
            />
          </fieldset>
          <button
            className="w-100 btn text-white"
            style={{ backgroundColor: "#FF3366" }}
            variant="primary"
            type="submit"
            disabled={!validEmail}
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordEmailVerification;
