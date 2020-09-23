const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateUpdate(data) {
  let errors = {};

  data = isEmpty(data) ? "" : JSON.stringify(data);

  if (Validator.isEmpty(data)) {
    errors.data = " You sent no data";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
