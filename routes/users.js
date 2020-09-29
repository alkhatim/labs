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

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router
  .route("/my-profile")
  .get(protect, authorize("admin", "agency", "lab", "user"), getMyUserProfile)
  .put(
    protect,
    authorize("admin", "agency", "lab", "user"),
    updateMyUserProfile
  );
router
  .route("/update-my-password")
  .put(protect, authorize("admin"), updateMyPassword);
router
  .route("/:id/update-password")
  .post(protect, authorize("admin"), updatePassword);

router
  .route("/:id")
  .get(authorize("admin"), getUser)
  .delete(authorize("admin"), deleteUser);

router.route("/update").put(authorize("agency"), updateUser);
module.exports = router;
