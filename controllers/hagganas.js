const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Haggana = require("../models/Haggana");

// GET GET GET GET GET GET GET GET GET GET GET GET GET GET

//@Desc   Get Current loggeed in user
//@route  POST /api/v1/auth/my-account
//@access Public
exports.getHagganas = asyncHandler(async (req, res, next) => {
  const hagganas = await Haggana.find({}).sort("done");
  res.status(200).json({ success: true, data: hagganas });
});

// GET GET GET GET GET GET GET GET GET GET GET GET GET GET

//@Desc   Get Current loggeed in user
//@route  POST /api/v1/auth/my-account
//@access Public
exports.getHagganasNotDone = asyncHandler(async (req, res, next) => {
  const hagganas = await Haggana.find({done: false});
  res.status(200).json({ success: true, data: hagganas });
});

// POST POST POST POST POST POST POST POST POST POST POST POST POST POST

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.postHaggana = asyncHandler(async (req, res, next) => {
  // Create Haggana
  const haggana = new Haggana(req.body);
  await haggana.save();
  res.status(200).json({ success: true, data: haggana });
});

// PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.doneHaggana = asyncHandler(async (req, res, next) => {
  // Create Haggana
  const haggana = await Haggana.findByIdAndUpdate(req.params.id, {done: true})
  res.status(200).json({ success: true, data: haggana });
});
