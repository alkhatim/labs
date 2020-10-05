const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const Haggana = new Schema({
  moniem: Number,
  mazin: Number,
  lab: Number,
  date: Date,
  done: Boolean
});

module.exports = mongoose.model("haggana", Haggana);
