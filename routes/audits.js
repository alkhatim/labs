const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getAudits,
} = require("../controllers/audits");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(authorize("super admin"), getAudits);

module.exports = router;
