import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../slices/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// regular expression for name,password and email validation
const USER_REGEX = /^([a-zA-Z ]){4,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
// const user = JSON.parse(localStorage.getItem("user"));

function Register() {
  const userRef = useRef();
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.auth);
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
    if (message.length) {
      if (!status) {
        toast.error(message);
        dispatch(reset());
      } else {
        toast.success(message);
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(reset());
        navigate(`/verifyUser/${user._id}`);
      }
    }
  }, [dispatch, message, status, navigate]);

  // useEffect(() => {
  //   if (success) {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     navigate(`verifyUser/${user._id}`);
  //     dispatch(clearMessage());
  //   }
  // }, [success, dispatch, navigate]);

  const handleSubmit = (e) => {
    console.log("aaaa");
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
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                className="card"
                style={{
                  borderRadius: "15px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
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
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
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
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="pwd"
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      <p
                        className={
                          pwdFocus && pwd && !validPwd
                            ? "d-block text-danger"
                            : "d-none"
                        }
                      >
                        Password Shoild be 8 to 24 Characters long and must
                        include atleast one lowercase letter, one uppercase
                        letter and a special character
                      </p>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
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
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example5cdg">
                        Contact No
                      </label>
                      <input
                        type="text"
                        id="form3Example5cdg"
                        className="form-control form-control-lg"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => setPhoneFocus(false)}
                      />
                      <p
                        className={
                          !validPhone && phoneFocus
                            ? "d-block text-danger"
                            : "d-none"
                        }
                      >
                        Mobile number is not valid
                      </p>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-block btn-lg gradient-custom-4  form-control form-control-lg text-white"
                      style={{ backgroundColor: "#FF3366" }}
                      value="Register"
                      disabled={
                        !validName ||
                        !validEmail ||
                        !validConfirmPwd ||
                        !validPwd ||
                        !validPhone
                      }
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
