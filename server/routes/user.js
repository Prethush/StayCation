const expres = require("express");
const router = expres.Router();
const {
  handleRegister,
  otpVerification,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.put("/otp_verify/:id", otpVerification);
module.exports = router;
