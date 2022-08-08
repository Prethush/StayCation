import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { otpVerification } from "../../slices/auth";
import { toast } from "react-toastify";

function OtpVerification() {
  const [formVal, setFormVal] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    const result = isNaN(formVal);
    setErrMsg(result);
  }, [formVal]);

  useEffect(() => {
    console.log(message, "message");
    if (message?.error) {
      toast.error(message.message);
    }
    if (message?.success) {
      toast.success(message.message);
    }
  }, [dispatch, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerification(formVal));
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-primary">
      <div className="container" style={{ width: "25vw" }}>
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
