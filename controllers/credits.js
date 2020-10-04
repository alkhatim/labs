const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//Import Validation
const validateUpdate = require("../validation/update");

//Import Models
const Credit = require("../models/Credit");

// GET GET GET GET GET GET GET GET GET GET GET GET GET GET

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getCreditsByDay = asyncHandler(async (req, res, next) => {
  //Calculating Order:
  var start = new Date(req.body.creditSummaryDate);
  start.setHours(0, 0, 0, 0);
  var end = new Date(req.body.creditSummaryDate);
  end.setHours(23, 59, 59, 999);
  const credits = await Credit.find({
    paymentDate: { $gte: start, $lt: end },
  });
  let dateCredit = {};
  if (!credits) {
    dateCredit = {
      lab: 0,
      mazin: 0,
      moniem: 0,
    };
  } else {
    let labCredit = 0;
    let mazinCredit = 0;
    let moniemCredit = 0;

    credits.forEach((credit) => {
      labCredit += credit.lab;
      mazinCredit += credit.mazin;
      moniemCredit += credit.moniem;
    });

    dateCredit = {
      lab: labCredit,
      mazin: mazinCredit,
      moniem: moniemCredit,
    };
  }
  res.status(200).json({
    success: true,
    data: dateCredit,
  });
});
