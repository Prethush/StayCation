const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/adminController");

router.post("/login", handleLogin);
module.exports = router;
