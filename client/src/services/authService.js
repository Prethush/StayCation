import axios from "axios";

const BASE_URL = "http://localhost:5555/api";
const REGISTER_URL = BASE_URL + "/user/register";
const OTP_VERIFICATION_URL = BASE_URL + "/user/otp_verify/";

const register = (name, email, pwd, phone) => {
  return axios.post(REGISTER_URL, {
    name,
    email,
    pwd,
    phone,
  });
};

const otpVerification = (val) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(OTP_VERIFICATION_URL + user._id, { val });
};

const authService = {
  register,
  otpVerification,
};

export default authService;
