const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendOtp, verifyOtp } = require("../utils/twilio");
const jwt = require("jsonwebtoken");
const send_mail = require("../utils/nodemailer");
// user signup
const handleRegister = async (req, res, next) => {
  const { name, email, pwd, phone } = req.body;
  console.log(req.body, "body");
  if (!name || !email || !pwd || !phone) {
    return res.status(400).json({ status: false, message: "Enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Email is already registered" });
    }
    user = await User.findOne({ phone_no: phone });
    if (user) {
      return res
        .status(401)
        .json({ status: false, message: "phone number is already registered" });
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    user = await User.create({
      name,
      email,
      pwd: hashedPwd,
      phone_no: phone,
    });
    const output = await sendOtp(phone);
    const newUser = {
      name: user.name,
      _id: user._id,
    };
    res.status(200).json({
      status: true,
      message: `${name} is successfully resgistered`,
      user: newUser,
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
    return res.json({ status: false, message: "Enter OTP" });
  }
  try {
    let user = await User.findById(id);
    console.log(user, "user");
    const result = await verifyOtp(user.phone_no, val);
    console.log(result, "result");
    if (result.valid && result.status === "approved") {
      user = await User.findByIdAndUpdate(id, { $set: { isVerified: true } });
      return res.status(200).json({
        status: true,
        message: "Your mobile number is successfully verified",
      });
    }
    if (!result.valid && result.status === "pending") {
      return res.status(400).json({
        status: false,
        message: "incorrect otp",
      });
    }
  } catch (err) {
    next(err);
  }
};

// handle login
const handleLogin = async (req, res, next) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res.status(400).json({ status: false, message: "Enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not registered" });
    }

    const result = await bcrypt.compare(pwd, user.pwd);
    console.log(result, "result");
    if (!result) {
      console.log(result, "result");
      return res
        .status(400)
        .json({ status: false, message: "Incorrect Password" });
    }

    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20d" }
    );

    // const refreshToken = await jwt.sign(
    //   { id: user._id },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "50d" }
    // );
    // user = await User.findByIdAndUpdate(user._id, { $set: { refreshToken } });
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    //   maxAge: 24 * 60 * 60 * 1000 * 50,
    // });

    const newUser = {
      name: user.name,
      _id: user._id,
    };
    res.status(200).json({
      status: true,
      message: "User is successfully logged in",
      accessToken,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// email verification
const handleEmailVerification = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: false, message: "Enter your registered email" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not registered" });
    }
    const output = await send_mail(user.name, user.email, user._id);
    console.log(output, "output");
    if (output.accepted.includes(user.email)) {
      return res.status(200).json({
        status: true,
        message:
          "A password reset link has send to your mail. Click on the link to reset the password",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Some error occured. Please try later",
      });
    }
  } catch (err) {
    next(err);
  }
};

// reset password
const handleResetPassword = async (req, res, next) => {
  const { pwd } = req.body;
  const { id } = req.params;
  if (!pwd) {
    return res.status(400).json({ status: false, message: "Enter password" });
  }
  try {
    let user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "User is not registered" });
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    user = await User.findByIdAndUpdate(id, { $set: { pwd: hashedPwd } });
    res
      .status(200)
      .json({ status: true, message: "Your password is successfully changed" });
  } catch (err) {
    next(err);
  }
};

// resend otp
const handleResendOtp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const result = await sendOtp(user.phone_no);
    res
      .status(200)
      .json({ status: true, message: "OTP is successfully to your mobile" });
  } catch (err) {
    next(err);
  }
};

// current loggedin user info
const handleCurrentUserInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select(
      "name email _id createdAt phone_no"
    );
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "No user info found" });
    }
    res.status(200).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  handleRegister,
  otpVerification,
  handleLogin,
  handleEmailVerification,
  handleResetPassword,
  handleResendOtp,
  handleCurrentUserInfo,
};
