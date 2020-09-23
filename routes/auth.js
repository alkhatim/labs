const express = require("express");
const {
  register,
  login,
  logout,
  getMyAccount,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

const router = express.Router();
//Import Middleware
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/my-account", protect, getMyAccount);
router.put("/update-details", protect, updateDetails);
router.put("/update-password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:reset-token", resetPassword);

module.exports = router;
