const Validator = require("validator");
const isEmpty = require("../is-empty");
const complexity = require("complexity");

module.exports = function validateSingupInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User name field is required";
  }

  if (!Validator.isLength(data.userName, { min: 3, max: 20 })) {
    errors.userName = "User name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is must be a valid email";
  }

  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone number field is must not be empty";
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is must not be empty";
  }

  // if (
  //   !Validator.contains(data.role, "admin" || "seeker" || "agency" || "agent")
  // ) {
  //   errors.role = "You sent an invalid user role";
  // }

  //Setting Complexity Options

  const options = {
    uppercase: 1, // A through Z
    lowercase: 1, // a through z
    digit: 1, // 0 through 9
    min: 6 // minumum number of characters
  };

  console.log(complexity.create(options));
  //Validate
  console.log(complexity.check(data.password, options));
  console.log(complexity.checkError(data.password, options));

  if (!complexity.check(data.password, options)) {
    const passwordErrorFields = complexity.checkError(data.password, options);
    errors.passwordErrorFields = passwordErrorFields;
    // errors.passwordErrors = passwordErrors.error.details[0].message;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
