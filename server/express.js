require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");

// const userRouter = require("./routes/user.route");

require("./config/database").connect();

// express app
const app = express();

// cors setup
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// expose public/uploads as /uploads
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
// app.use(uploadRouter);

// middlware error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// mount routes
// app.use("/", userRouter);

module.exports = app;
