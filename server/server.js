require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5555;
const logger = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// connect to database
connectDB();

// middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/user/", require("./routes/user"));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
