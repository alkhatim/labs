const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// Create Schema
const CreditSchema = new Schema({
  paymentDate: {
    type: Date,
  },
  application: {
    type: Schema.Types.ObjectID,
    ref: "applications",
  },
  agency: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  lab: {
    type: Number,
  },
  mazin: {
    type: Number,
  },
  moniem: {
    type: Number,
  },
});
module.exports = Credit = mongoose.model("credits", CreditSchema);
