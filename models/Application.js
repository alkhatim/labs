const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  ename: {
    type: String,
    required: true,
},
  order: {
    type: Number,
    required: true,
  },
   fees: {
    type: Number,
  },
  airlines: {
    type: String,
    enum: [
      "Sudanair",
      "Badr",
      "Tarko",
      "Eithiopian",
      "Turkey",
      "Fly Dubai",
      "Qatar",
      "Fly Emarits",
      "Itihad",
      "Nas",
      "Saudi",
      "other",
    ],
  },
  paymentStatus: {
    type: String,
    enum: [
      "paid with commission",
      "not paid",
      "paid without commission",
      "paid",
    ],
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "transfer"],
  },
  receiptNumber: {
    type: String,
  },
  receiptUrl: {
    type: String,
  },
  agencyPaymentStatus: {
    type: String,
    enum: ["paid", "not paid"],
  },
  labPaymentStatus: {
    type: String,
    enum: ["paid", "not paid"],
  },
  otherAirlines: {
    type: String,
  },
  type: {
    type: String,
    enum: ["external", "internal"],
  },
  location: {
    type: String,
  },
  QRCode: {
    type: String,
  },
  flightTime: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
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
  isDeadCase: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
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
