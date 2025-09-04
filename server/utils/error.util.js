exports.validationError = (message) => {
  throw {
    status: 400,
    message,
  };
};
