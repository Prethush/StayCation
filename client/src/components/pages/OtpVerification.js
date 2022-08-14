import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otpVerification, reset } from "../../slices/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./otpverification.css";

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
        navigate("/home");
      }
    }
  }, [dispatch, message, navigate, status]);

  // useEffect(() => {
  //   if (success) {
  //     navigate("/home");
  //   }
  // }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerification(formVal));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="form-container" style={{ width: "25vw" }}>
        <Form
          className="p-5 rounded bg-white"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="text-center mb-3">
              <span
                style={{
                  fontSize: "1rem",
                  color: "#228c22",
                }}
              >
                An OTP has send to your mobile number for verfication. Please
                enter the OPT
              </span>
            </div>
            <Form.Control
              type="text"
              placeholder="otp"
              onChange={(e) => setFormVal(e.target.value)}
            />
            <span
              className={formVal && errMsg ? "d-block text-danger" : "d-none"}
              style={{ fontSize: ".9rem", margin: ".5rem" }}
            >
              OTP should be number
            </span>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={errMsg || formVal.length !== 6}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default OtpVerification;
