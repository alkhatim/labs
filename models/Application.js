const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  name1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
    required: true,
  },
  name3: {
    type: String,
    required: true,
  },
  name4: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: [true, "تم التسجيل باستعمال رقم الهاتف مسبقا"],
    match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/],
  },
  destination: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  flightDate: {
    type: Date,
    required: true,
  },
  testDate: {
    type: Date,
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  confirmBooking: {
    type: Boolean,
    default: false,
  },
  attenedTest: {
    type: Boolean,
    default: false,
  },
  resultIssued: {
    type: Boolean,
    default: false,
  },
  resultWasDelivered: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    enum: ["registered", "tested", "result issued", "result delivered"],
  },
});
module.exports = Application = mongoose.model(
  "applications",
  ApplicationSchema
);
