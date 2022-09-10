import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, reset } from "../../slices/auth";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
function Login() {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.auth);
  console.log(message, "messag", status, "status");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = pwd.length > 6;
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    if (message.length) {
      if (!status) {
        toast.error(message);
        dispatch(reset());
      } else {
        toast.success(message);
        dispatch(reset());
      }
    }
  }, [dispatch, message, status]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      email,
      pwd,
    };
    dispatch(adminLogin(obj));
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <form
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
              onSubmit={handleSubmit}
            >
              <div className="card-body p-5">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase text-center">
                    Login
                  </h2>
                  <div className="form-outline form-white mb-4">
                    <label className="form-label mb-3" htmlFor="typeEmailX">
                      Email
                    </label>
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      ref={emailRef}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label mb-3" htmlFor="typePasswordX">
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      name="pwd"
                      onChange={(e) => setPwd(e.target.value)}
                    />
                  </div>
                  <input
                    className="btn btn-outline-light btn-lg px-5 form-control form-control-lg mt-3"
                    type="submit"
                    value="Login"
                    disabled={!validEmail || !validPwd}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
