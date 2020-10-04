const express = require("express");

const router = express.Router({ mergeParams: true });

const { getCreditsByDay } = require("../controllers/credits");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.route("/").post(authorize("super admin", "admin"), getCreditsByDay);

module.exports = router;
