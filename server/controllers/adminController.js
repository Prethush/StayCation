const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ModelBuildContext,
} = require("twilio/lib/rest/preview/understand/assistant/modelBuild");

// login
const handleLogin = async (req, res, next) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res
      .status(400)
      .json({ status: false, message: "Enter both fileds" });
  }
  try {
    const admin = await Admin.findOne({ email });
    console.log(admin, "admin");
    if (!admin) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not registered" });
    }
    if (pwd !== admin.pwd) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized access" });
    }
    const accessToken = await jwt.sign(
      { id: admin._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20d" }
    );

    const refreshToken = await jwt.sign(
      { id: admin._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "50d" }
    );
    res.cookie("admin-jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000 * 50,
    });

    res.status(200).json({
      status: true,
      message: "Admin is successfully loggedin",
      accessToken,
      admin: admin._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleLogin,
};
