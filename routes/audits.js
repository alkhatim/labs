const express = require("express");

const router = express.Router({ mergeParams: true });

const { getAudits, getAudit } = require("../controllers/audits");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/:id").get(authorize("super admin"), getAudit);
router.route("/").get(authorize("super admin"), getAudits);

module.exports = router;
