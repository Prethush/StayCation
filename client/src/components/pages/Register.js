import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../slices/auth";
import { toast } from "react-toastify";
import { clearMessage } from "../../slices/message";
import { useNavigate } from "react-router-dom";
import "./register.css";

// regular expression for name,password and email validation
const USER_REGEX = /^([a-zA-Z ]){4,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function Register() {
  const userRef = useRef();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = !isNaN(phone) && phone.length === 10;
    setValidPhone(result);
  }, [phone]);
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === confirmPwd;
    setValidConfirmPwd(match);
  }, [pwd, confirmPwd]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [name, email, pwd, confirmPwd]);

  useEffect(() => {
    if (message?.error) {
      toast.error(message.message);
    }
    if (message?.success) {
      toast.success(message.message);
      setSuccess(true);
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      navigate(`verifyUser/${user._id}`);
      dispatch(clearMessage());
    }
  }, [success, dispatch, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      email,
      pwd,
      phone,
    };
    dispatch(register(obj));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="form-container" style={{ width: "30vw" }}>
        <Form
          onSubmit={handleSubmit}
          className="p-5 rounded bg-white"
          style={{
            margin: "0 auto",
          }}
        >
          <legend className="text-center">Register Form</legend>
          {/* Name Field */}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={userRef}
              name="name"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                userFocus && name && !validName
                  ? "d-block text-danger"
                  : "d-none"
              }
            >
              Name should contain only letters and spaces
            </p>
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail
                  ? "d-block text-danger"
                  : "d-none"
              }
            >
              Email is not valid
            </p>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="pwd"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              className={
                pwdFocus && pwd && !validPwd ? "d-block text-danger" : "d-none"
              }
            >
              Password Shoild be 8 to 24 Characters long and must include
              atleast one lowercase letter, one uppercase letter and a special
              character
            </p>
          </Form.Group>

          {/* Confirm Password field */}
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              name="confirmPwd"
              onChange={(e) => setConfirmPwd(e.target.value)}
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
            />
            <p
              className={
                !validConfirmPwd && confirmPwdFocus
                  ? "d-block text-danger"
                  : "d-none"
              }
            >
              Password is incorrect
            </p>
          </Form.Group>

          {/* Mobile No */}
          <Form.Group className="mb-3" controlId="formConfirmPhoneNumber">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p
              className={
                !validPhone && phoneFocus ? "d-block text-danger" : "d-none"
              }
            >
              Mobile number is not valid
            </p>
          </Form.Group>
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={
              !validName ||
              !validEmail ||
              !validConfirmPwd ||
              !validPwd ||
              !validPhone
            }
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
