import { Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useSlector, useDispatch, useSelector } from "react-redux";
import { resetPassword, reset } from "../../slices/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function ResetPassword() {
  const pwdRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const { message, status } = useSelector((state) => state.auth);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  useEffect(() => {
    pwdRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === confirmPwd;
    setValidConfirmPwd(match);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (message.length) {
      if (!status) {
        toast.error(message);
      } else {
        toast.success(message);
        dispatch(reset());
        navigate("/login");
      }
    }
  }, [message, dispatch, status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      pwd,
    };
    dispatch(resetPassword(obj));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container col-sm-6 col-lg-4 col-xl-3">
        <form
          className="p-5 rounded bg-white"
          onSubmit={handleSubmit}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <fieldset className="mb-3" id="formBasicEmail">
            <label htmlFor="pwd">New Password</label>
            <input
              type="password"
              placeholder="Password"
              ref={pwdRef}
              name="pwd"
              id="pwd"
              className="form-control mt-2"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              className={
                pwdFocus && pwd && !validPwd
                  ? "d-block text-danger mt-2"
                  : "d-none"
              }
            >
              Password Shoild be 8 to 24 Characters long and must include
              atleast one lowercase letter, one uppercase letter and a special
              character
            </p>
          </fieldset>
          <fieldset className="mb-3" controlId="formConfirmEmail">
            <label htmlFor="confirmPwd">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPwd"
              id="confirmPwd"
              className="form-control mt-2"
              onChange={(e) => setConfirmPwd(e.target.value)}
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
            />
            <p
              className={
                !validConfirmPwd && confirmPwdFocus
                  ? "d-block text-danger mt-2"
                  : "d-none"
              }
            >
              Password is incorrect
            </p>
          </fieldset>
          <button
            variant="primary"
            type="submit"
            className="w-100 btn text-white"
            style={{ backgroundColor: "#FF3366" }}
            disabled={!validConfirmPwd || !validPwd}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
