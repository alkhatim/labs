const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  getMyUserProfile,
  updateMyUserProfile,
  updateMyPassword,
} = require("../controllers/users");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

//Import Middleware
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router
  .route("/")
  .get(advancedResults(User), authorize("admin"), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/my-profile")
  .get(authorize("admin", "agency", "lab", "user"), getMyUserProfile)
  .put(authorize("admin", "agency", "lab", "user"), updateMyUserProfile);
router.route("/update-my-password").put(authorize("admin"), updateMyPassword);
router.route("/:id/update-password").post(authorize("admin"), updatePassword);

router
  .route("/:id")
  .get(authorize("admin"), getUser)
  .delete(authorize("admin"), deleteUser);

router.route("/update").put(authorize("agency"), updateUser);
module.exports = router;
