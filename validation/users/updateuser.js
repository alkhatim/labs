const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateUpdateInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
