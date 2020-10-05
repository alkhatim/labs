const express = require("express");

const router = express.Router({ mergeParams: true });

const { postHaggana, doneHaggana, getHagganas, getHagganasNotDone } = require("../controllers/hagganas");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router
.route("/:id/done")
.post(authorize("super admin"), doneHaggana);

router
  .route("/notdone")
  .get(authorize("super admin", "admin"), getHagganasNotDone);


  router
    .route("/")
    .get(authorize("super admin", "admin"), getHagganas)
    .post(authorize("super admin", "admin"), postHaggana);

module.exports = router;
