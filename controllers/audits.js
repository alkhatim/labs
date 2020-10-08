const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Audit = require("../models/Audit");

// GET GET GET GET GET GET GET GET GET GET GET GET GET GET

//@Desc   Get Current loggeed in user
//@route  POST /api/v1/auth/my-account
//@access Public
exports.getAudits = asyncHandler(async (req, res, next) => {
  const audits = await Audit.find({}).sort("done");
  res.status(200).json({ success: true, data: audits });
});

//@Desc   Get Current loggeed in user
//@route  POST /api/v1/auth/my-account
//@access Public
exports.getAudit = asyncHandler(async (req, res, next) => {
  const audit = await Audit.findById(req.params.id);
  res.status(200).json({ success: true, data: audit });
});
