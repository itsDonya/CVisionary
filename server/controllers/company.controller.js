// require("dotenv").config();

// // models
// const User = require("../models/user.model");
// const Company = require("../models/company.model");

// // services
// const { sendEmail } = require("../services/email/node-mailer");

// const createCompany = async (req, res) => {
//   try {
//     const user = req.user;

//     const request = await Company.create({
//       ...req.body,
//       user: user?._id || null,
//     });
//     if (!request._id)
//       return res.status(500).send({ error: "Error making company request" });

//     await User.updateOne(
//       { _id: user._id },
//       {
//         requests: [...(user.requests || []), request._id],
//       },
//       { new: true }
//     );

//     // send email to client
//     const clientEmailConfig = {
//       companyData: request,
//       user: req.user,
//       date: request.createdAt,
//     };
//     if (user?.role != "admin") sendEmail("client-company", clientEmailConfig);

//     // send email to admin
//     const adminEmailConfig = {
//       companyData: request,
//       user: req.user,
//       date: request.createdAt,
//     };
//     if (user?.role != "admin") sendEmail("admin-company", adminEmailConfig);

//     return res.status(200).send({ message: "Request successfully sent" });
//   } catch (err) {
//     res.status(500).send({
//       error: "Error making company request",
//       errorMessage: err.message,
//     });
//   }
// };

// module.exports = { createCompany };
