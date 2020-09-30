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
const { updateUserPassword } = require("../controllers/auth");

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router
  .route("/:id/update-password")
  .post(protect, authorize("admin"), updatePassword);

router
  .route("/:id/update-user-password")
  .post(protect, authorize("admin"), updateUserPassword);

router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .delete(protect, authorize("admin"), deleteUser);

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
  .put(protect, authorize("admin", "agency"), updateMyPassword);

router.route("/update").put(authorize("agency"), updateUser);
module.exports = router;
