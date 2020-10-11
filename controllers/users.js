const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//Import Validation
const validateUpdate = require("../validation/update");

//Import Models
const User = require("../models/User");

// GET GET GET GET GET GET GET GET GET GET GET GET GET GET

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getMyUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id.toString());
  if (!user) {
    return next(new ErrorResponse("حدث خطأ في الخادم", 500));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// POST POST POST POST POST POST POST POST POST POST POST POST POST POST

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const userCheckUserName = await User.findOne({userName: req.body.userName});
  if(userCheckUserName){
    return next(new ErrorResponse("اسم المستخدم محجوز الرجاء اختيار اسم مستخدم اخر ", 400));
  }
   const userCheckPhone = await User.findOne({phoneNumber: req.body.phoneNumber});
  if(userCheckPhone){
    return next(new ErrorResponse("تم تسجيل حساب بنفس بيانات رقم الهاتف ", 400));
  }
  const userCheckEmail = await User.findOne({email: req.body.email});
  if(userCheckEmail){
    return next(new ErrorResponse("تم تسجيل حساب بنفس بيانات البريد الاليكتروني ", 400));
  }
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT PUT

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateUpdate(req.body);
  // Check Validation
  if (!isValid) {
    return next(new ErrorResponse(`${errors}`, 400));
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    context: "query",
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateMyUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    context: "query",
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/users/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");
  // Check current password
  if (!(await user.matchPassword(req.body.oldPassword))) {
    return next(new ErrorResponse("كلمة المرور غير صحيحة", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Update password
// @route     PUT /api/v1/users/updatepassword
// @access    Private
exports.updateMyPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("كلمة المرور غير صحيحة", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});

// HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS HELPERS

//Get token from model also create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    userName: user.userName,
    name: user.name,
    role: user.role,
    type: user.type
  });
};
