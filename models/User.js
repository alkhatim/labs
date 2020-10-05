const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "الرجاء ادخال اسم المستخدم"],
    unique: [true, "اسم المستخدم محجوز"],
  },
  name: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "الرجاء ادخال كلمة المرور"],
    minlength: 6,
    maxlength: 255,
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: [true, "الرجاء ادخال رقم الهاتف"],
    unique: [true, "رقم الهاتف مستعمل مسبقا"],
    match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/],
  },
  email: {
    type: String,
    required: [true, "الرجاء اضافة البريد الاليكتروني"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "الرجاء التاكد من صحة البريد الاليكتروني",
    ],
  },
  role: {
    type: String,
    enum: [
      "agency",
      "lab",
      "admin",
      "office coordinator",
      "client",
      "super admin",
    ],
    default: "agency",
  },
  type: {
    type: String,
    enum: [
      "agency",
      "corporate",
      "organization",
      "diplomatic committee",
      "recruitment office",
      "other",
    ],
  },
  photo: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model("users", UserSchema);
