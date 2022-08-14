const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({
      error: true,
      message: "You are not allowed to access this route",
    });
  const token = authHeader.split(" ")[1];
  try {
    const id = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyJWT,
};
