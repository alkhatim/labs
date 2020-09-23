const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const moment = require("moment");

//Import Models
const Application = require("../models/Application");

exports.getApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find();
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getMyApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getMyApplicationsCountAccordingToState = asyncHandler(
  async (req, res, next) => {
    const registeredApplications = await Application.find({
      user: req.user.id,
      state: "registered",
    });
    const testedApplications = await Application.find({
      user: req.user.id,
      state: "tested",
    });
    const resultIssuedApplications = await Application.find({
      user: req.user.id,
      state: "result issued",
    });
    const resultDeliveredApplications = await Application.find({
      user: req.user.id,
      state: "result delivered",
    });

    res.status(200).json({
      success: true,
      registeredCount: registeredApplications.length,
      testedCount: testedApplications.length,
      issuedCount: resultIssuedApplications.length,
      deliveredCount: resultDeliveredApplications.length,
    });
  }
);

exports.getApplicationsCountAccordingToState = asyncHandler(
  async (req, res, next) => {
    const registeredApplications = await Application.find({
      state: "registered",
    });
    const testedApplications = await Application.find({
      state: "tested",
    });
    const resultIssuedApplications = await Application.find({
      state: "result issued",
    });
    const resultDeliveredApplications = await Application.find({
      state: "result delivered",
    });

    res.status(200).json({
      success: true,
      registeredCount: registeredApplications.length,
      testedCount: testedApplications.length,
      issuedCount: resultIssuedApplications.length,
      deliveredCount: resultDeliveredApplications.length,
    });
  }
);

exports.getApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`هذا الفحص لم يعد موجودا`, 404));
  }
  res.status(200).json({
    success: true,
    data: application,
  });
});

exports.addApplication = asyncHandler(async (req, res, next) => {
  const applicationCheck = await Application.findOne({
    passportNumber: req.body.passportNumber.trim(),
  });
  if (applicationCheck) {
    return next(new ErrorResponse(`تم اضافة الطلب مسبقا`, 400));
  }

  //Check dates validity
  let startDate = moment(new Date(req.body.testDate));
  let endDate = moment(new Date(req.body.flightDate));
  let duration = moment.duration(endDate.diff(startDate));
  const testValidity = duration.asMonths();
  //Validity Check
  if (testValidity <= 0) {
    return next(
      new ErrorResponse(`تاريخ الفحص يجب ان يكون قبل تاريخ الرحلة`, 400)
    );
  }
  if (req.user) {
    req.body.user = req.user.id;
  }
  req.body.state = "registered";
  req.body.passportNumber = req.body.passportNumber.toUpperCase().trim();

  const application = new Application(req.body);
  await application.save();
  res.status(200).json({
    success: true,
    data: application,
  });
});

// @desc      Add visa
// @route     POST /api/v1/agencies/:agencyId/visas
// @access    Private
exports.updateApplication = asyncHandler(async (req, res, next) => {
  const newApplication = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
    }
  );

  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`No visa found`, 404));
  }
  res.status(201).json({
    success: true,
    data: application,
  });
});

exports.deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`هذا الفحص لم يعد موجودا`, 404));
  }
  await Application.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: application,
  });
});
