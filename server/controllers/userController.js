const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendOtp, verifyOtp } = require("../utils/twilio");

// user signup
const handleRegister = async (req, res, next) => {
  const { name, email, pwd, phone } = req.body;
  if (!name || !email || !pwd || !phone) {
    return res.status(400).json({ error: true, message: "Enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "Email is already registered" });
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    user = await User.create({
      name,
      email,
      pwd: hashedPwd,
      phone_no: phone,
    });
    sendOtp(phone);
    res.status(200).json({
      success: true,
      message: `${name} is successfully resgistered`,
      user,
    });
  } catch (err) {
    console.log(err, "Err");
    next(err);
  }
};

// verify user mobile number
const otpVerification = async (req, res, next) => {
  const { id } = req.params;
  const { val } = req.body;
  if (!val) {
    return res.json({ error: true, message: "Enter OTP" });
  }
  try {
    const user = await User.findById(id);
    const result = await verifyOtp(user.phone_no, val);
    console.log(result);
    if (result.valid && result.status === "approved") {
      return res.status(200).json({
        success: true,
        message: "Your mobile number is successfully verified",
      });
    }
    if (!result.valid && result.status === "pending") {
      return res.status(400).json({
        error: true,
        message: "incorrect otp",
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  handleRegister,
  otpVerification,
};
