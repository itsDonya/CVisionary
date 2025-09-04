// const Joi = require("joi");
// const { validationError } = require("../utils/error.util");

// async function validateAddBlog(data) {
//   const addNewPostSchema = Joi.object({
//     title: Joi.string()
//       .min(5)
//       .max(100)
//       .required()
//       .error(() =>
//         validationError(
//           "Enter title correctly; required, between 5 to 100 characters"
//         )
//       ),
//     slug: Joi.string()
//       .required()
//       .error(() => validationError("Enter slug correctly; required")),
//     category: Joi.string()
//       .required()
//       .error(() => validationError("Enter category ID correctly; required")),
//     text: Joi.string()
//       .required()
//       .min(100)
//       .error(() =>
//         validationError(
//           "Enter text correctly; required, at least 100 characters"
//         )
//       ),
//     briefText: Joi.string()
//       .required()
//       .min(10)
//       .max(400)
//       .error(() =>
//         validationError(
//           "Enter brief text correctly; required, between 10 to 400 characters"
//         )
//       ),
//     readingTime: Joi.number()
//       .required()
//       .min(1)
//       .error(() =>
//         validationError(
//           "Enter reading time correctly; required, at least 1 minute"
//         )
//       ),
//     tags: Joi.array()
//       .items(Joi.string())
//       .error(() =>
//         validationError("Enter tags correctly; required, an array of strings")
//       ),
//     coverImage: Joi.string()
//       .required()
//       .error(() => validationError("Enter cover image correctly; required")),
//   });
//   return addNewPostSchema.validateAsync(data);
// }

// module.exports = {
//   validateAddBlog,
// };
