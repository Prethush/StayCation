import axios from "axios";

// url
const BASE_URL = "http://localhost:5000/api";
const REGISTER_URL = `${BASE_URL}/user/register`;
const OTP_VERIFICATION_URL = `${BASE_URL}/user/otp_verify/`;
const LOGIN_URL = `${BASE_URL}/user/login`;
const EMAIL_VERIFICATION_URL = `${BASE_URL}/user/email_verify`;
const RESET_PASSWORD_URL = `${BASE_URL}/user/reset_password`;
// register
const register = async (name, email, pwd, phone) => {
  const response = await axios.post(REGISTER_URL, {
    name,
    email,
    pwd,
    phone,
  });
  if (response.data && response.data.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

// otp verification
const otpVerification = (val) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(OTP_VERIFICATION_URL + user._id, { val });
};

// login
const login = async (email, pwd) => {
  const response = await axios.post(LOGIN_URL, {
    email,
    pwd,
  });
  if (response.data && response.data.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  if (response.data && response.data.hasOwnProperty("accessToken")) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
  }
  return response;
};

// email verifiaction
const emailVerify = async (email) => {
  const response = await axios.post(EMAIL_VERIFICATION_URL, {
    email,
  });
  if (response.data && response.data.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

// reset password
const resetPasswd = async (pwd) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axios.put(`${RESET_PASSWORD_URL}/${user._id}`, {
    pwd,
  });
  return response;
};
const authService = {
  register,
  otpVerification,
  login,
  emailVerify,
  resetPasswd,
};

export default authService;
