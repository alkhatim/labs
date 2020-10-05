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
  .route("/my-profile")
  .get(
    protect,
    authorize(
      "admin",
      "agency",
      "lab",
      "user",
      "super admin",
      "office coordinator"
    ),
    getMyUserProfile
  )
  .put(
    protect,
    authorize(
      "admin",
      "agency",
      "lab",
      "user",
      "super admin",
      "office coordinator"
    ),
    updateMyUserProfile
  );

router
  .route("/:id/update-password")
  .post(protect, authorize("admin", "super admin"), updatePassword);

router
  .route("/:id/update-user-password")
  .post(protect, authorize("admin", "super admin"), updateUserPassword);

router
  .route("/:id")
  .get(protect, authorize("admin", "super admin"), getUser)
  .delete(protect, authorize("admin", "super admin"), deleteUser);

router
  .route("/update-my-password")
  .put(protect, authorize("admin", "agency", "super admin", "lab","office coordinator",), updateMyPassword);

router.route("/update").put(authorize("agency", "super admin"), updateUser);
module.exports = router;
