const expres = require("express");
const router = expres.Router();
const {
  handleRegister,
  otpVerification,
  handleLogin,
  handleEmailVerification,
  handleResetPassword,
  handleResendOtp,
  handleCurrentUserInfo,
} = require("../controllers/userController");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

router.post("/register", handleRegister);
router.put("/otp_verify/:id", otpVerification);
router.post("/login", handleLogin);
router.post("/email_verify", handleEmailVerification);
router.put("/reset_password/:id", handleResetPassword);
router.get("/resend_otp/:id", handleResendOtp);
router.get("/:id", handleCurrentUserInfo);
// generate access token using refresh token
router.get("/generate_access_token", handleRefreshToken);

module.exports = router;
