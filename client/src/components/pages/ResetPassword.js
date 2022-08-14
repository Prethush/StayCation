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
      }
    }
  }, [message, dispatch, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      pwd,
    };
    dispatch(resetPassword(obj));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="form-container" style={{ width: "25vw" }}>
        <Form className="p-5 rounded bg-white" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={pwdRef}
              name="pwd"
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPwd"
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
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={!validConfirmPwd || !validPwd}
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
