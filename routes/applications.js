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
  printApplicationReceipt,
  downloadApplicationReceipt,
  getMyApplicationsPaid,
  getMyApplicationsNotPaid,
  getAgenciesApplicationsNotPaid,
  getAgenciesApplicationsPaid,
  payAgencyApplication,
  getApplicationsByDates,
  labPaidForApplications,
} = require("../controllers/applications");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    protect,
    authorize("admin", "lab", "office coordinator"),
    getApplications
  )
  .post(
    protect,
    authorize("admin", "agency", "user", "lab", "office coordinator"),
    addApplication
  );

router
  .route("/lab/not-paid")
  .post(protect, authorize("admin", "super admin"), getApplicationsByDates);

router
  .route("/lab/paying")
  .post(protect, authorize("admin", "super admin"), labPaidForApplications);

router
  .route("/my-applications/not-paid")
  .get(protect, authorize("admin", "agency"), getMyApplicationsNotPaid);

router
  .route("/my-applications/paid")
  .get(protect, authorize("admin", "agency"), getMyApplicationsPaid);

router
  .route("/my-applications")
  .get(protect, authorize("admin", "lab", "agency"), getMyApplications);

router
  .route("/not-paid")
  .get(
    protect,
    authorize("admin", "super admin"),
    getAgenciesApplicationsNotPaid
  );

router
  .route("/paid")
  .get(protect, authorize("admin", "super admin"), getAgenciesApplicationsPaid);

router
  .route("/pay")
  .post(protect, authorize("admin", "super admin"), payAgencyApplication);

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
    authorize("admin", "lab", "office coordinator"),
    getApplicationsCountAccordingToState
  );

router
  .route("/:applicationId/download-receipt")
  .get(
    protect,
    authorize("admin", "agency", "lab", "office coordinator"),
    downloadApplicationReceipt
  );

router
  .route("/:applicationId/print-application")
  .post(
    protect,
    authorize("admin", "agency", "lab", "office coordinator"),
    printApplicationReceipt
  );

router
  .route("/:id")
  .get(getApplication)
  .put(
    protect,
    authorize("admin", "agency", "lab", "office coordinator"),
    updateApplication
  )
  .delete(protect, authorize("admin", "agency", "lab"), deleteApplication);

module.exports = router;
