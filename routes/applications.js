const express = require("express");
const router = express.Router();

const {
  getApplications,
  getMyApplications,
  getApplication,
  addApplication,
  updateApplication,
  deleteApplication,
  getMyApplicationsCountAccordingToState,
  getApplicationsCountAccordingToState,
} = require("../controllers/applications");

// Load Application Model
const Application = require("../models/Application");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin", "lab"), getApplications)
  .post(protect, authorize("admin", "agency", "user", "lab"), addApplication);

router
  .route("/my-applications")
  .get(protect, authorize("admin", "lab", "agency"), getMyApplications);
router
  .route("/statistics")
  .get(
    protect,
    authorize("admin", "lab", "agency"),
    getMyApplicationsCountAccordingToState
  );

router
  .route("/all-statistics")
  .get(
    protect,
    authorize("admin", "lab"),
    getApplicationsCountAccordingToState
  );

router
  .route("/:id")
  .get(getApplication)
  .put(protect, authorize("admin", "agency", "lab"), updateApplication)
  .delete(protect, authorize("admin", "agency", "lab"), deleteApplication);

module.exports = router;
