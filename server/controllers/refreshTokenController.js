const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ error: true, message: "Authorized access" });
  console.log(cookies);
  const refreshToken = cookies.jwt;
  try {
    const id = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(id);
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized route" });
    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "access token is created",
        accessToken,
        role: user.role,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleRefreshToken,
};
