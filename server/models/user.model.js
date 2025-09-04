// const { ObjectId } = require("bson");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     fullname: {
//       type: String,
//       required: false,
//       default: null,
//     },
//     mobile: {
//       type: String,
//       required: false,
//       default: null,
//     },
//     email: {
//       type: String,
//       required: true,
//       default: null,
//     },
//     password: {
//       type: String,
//       required: true,
//       default: null,
//     },
//     role: {
//       type: String,
//       required: false,
//       default: "user",
//     },
//     reservations: [{ type: ObjectId, ref: "Reservation" }],
//     requests: [{ type: ObjectId, ref: "Company" }],
//     messages: [{ type: ObjectId, ref: "Message" }],
//     likedBlogs: [{ type: ObjectId, ref: "Blog" }],
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// module.exports = User;
