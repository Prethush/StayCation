import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otpVerification, reset } from "../../slices/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OtpVerification() {
  const [formVal, setFormVal] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  const { message, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const result = isNaN(formVal);
    setErrMsg(result);
  }, [formVal]);

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

  // resend otp
  const resendOtp = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5000/api/user/resend_otp/${user._id}`)
      .then((res) => toast.success("OTP send Successfully"))
      .catch((err) => toast.error("Some error has happened, try later"));
  };

  useEffect(() => {});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerification(formVal));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="container col-sm-6 col-lg-4 col-xl-3">
        <form
          className="p-5 rounded bg-white"
          onSubmit={(e) => handleSubmit(e)}
        >
          <fieldset className="mb-3" id="formBasicEmail">
            <div className="text-center mb-3">
              <span
                style={{
                  fontSize: "1rem",
                  color: "#228c22",
                }}
              >
                An OTP has send to your mobile number for verfication. Please
                enter the OTP
              </span>
            </div>
            <input
              type="text"
              placeholder="otp"
              onChange={(e) => setFormVal(e.target.value)}
              className="form-control"
            />
            <span
              className={formVal && errMsg ? "d-block text-danger" : "d-none"}
              style={{ fontSize: ".9rem", margin: ".5rem" }}
            >
              OTP should be number
            </span>
          </fieldset>
          <button
            variant="primary"
            type="submit"
            className="w-100 btn btn-primary"
            disabled={errMsg || formVal.length !== 6}
          >
            Submit
          </button>
          <div>
            <p className="text-center mt-2" style={{ color: "gray" }}>
              OTP not received?{" "}
              <span
                onClick={resendOtp}
                style={{ color: "#ff3366", cursor: "pointer" }}
              >
                Resend
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
