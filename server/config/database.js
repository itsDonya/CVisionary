const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected successfully :)");
    })
    .catch((error) => {
      console.log("Database connection error");
      console.log("Exiting now...");
      console.error(error);
      process.exit(1);
    });
};
