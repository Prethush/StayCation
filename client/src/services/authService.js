import axios from "axios";

// url
const BASE_URL = "http://localhost:5000/api";
const REGISTER_URL = `${BASE_URL}/user/register`;
const OTP_VERIFICATION_URL = `${BASE_URL}/user/otp_verify/`;
const LOGIN_URL = `${BASE_URL}/user/login`;
const EMAIL_VERIFICATION_URL = `${BASE_URL}/user/email_verify`;
const RESET_PASSWORD_URL = `${BASE_URL}/user/reset_password`;
const RESEND_OTP = `${BASE_URL}/user/resend_otp`;
const ADMIN_LOGIN_URL = `${BASE_URL}/admin/login`;
const CURRENT_USER_URL = `${BASE_URL}/user/`;

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};
// register
const register = async (name, email, pwd, phone) => {
  const response = await axios.post(REGISTER_URL, {
    name,
    email,
    pwd,
    phone,
  });
  if (response?.data?.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

// otp verification
const otpVerification = (val) => {
  try {
    const user = getUser();
    return axios.put(OTP_VERIFICATION_URL + user._id, { val });
  } catch (error) {
    console.log(error);
  }
};

// login
const login = async (email, pwd) => {
  const response = await axios.post(LOGIN_URL, {
    email,
    pwd,
  });

  if (response?.data?.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  if (response?.data?.hasOwnProperty("accessToken")) {
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
  if (response?.data?.hasOwnProperty("user")) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response;
};

// reset password
const resetPasswd = async (pwd) => {
  const user = getUser();
  const response = await axios.put(`${RESET_PASSWORD_URL}/${user._id}`, {
    pwd,
  });
  return response;
};

// resend mobile otp
const resendOtp = async () => {
  const user = getUser();
  const response = await axios.get(`${RESEND_OTP}/${user._id}`);
  return response.data;
};

// logout user
const logout = async () => {
  localStorage.clear();
};

// admin login
const adminLogin = async (email, pwd) => {
  const response = await axios.post(ADMIN_LOGIN_URL, {
    email,
    pwd,
  });
  if (response?.data?.hasOwnProperty("admin")) {
    localStorage.setItem("admin", JSON.stringify(response.data.admin));
  }
  if (response?.data?.hasOwnProperty("accessToken")) {
    localStorage.setItem(
      "adminAccessToken",
      JSON.stringify(response.data.accessToken)
    );
  }
  return response;
};

// info about current user
const handleCurrentUserInfo = async () => {
  const user = getUser();
  const response = await axios.get(`${CURRENT_USER_URL}${user._id}`);
  return response;
};

const authService = {
  register,
  otpVerification,
  login,
  emailVerify,
  resendOtp,
  resetPasswd,
  logout,
  adminLogin,
  handleCurrentUserInfo,
};

export default authService;
