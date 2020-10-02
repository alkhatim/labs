const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const pdf = require("../utils/pdf");
const htmlPdf = require("html-pdf");
const QRCodeGenerator = require("qrcode");
const moment = require("moment");
const path = require("path");

//Import Models
const Application = require("../models/Application");
const User = require("../models/User");

exports.getApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find();
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getMyApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({ user: req.user.id }).populate(
    "user"
  );
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
    req.body.user = req.user._id;
  }
  req.body.state = "registered";
  req.body.passportNumber = req.body.passportNumber.toUpperCase().trim();
  let application = new Application(req.body);
  await application.save();

  const QRCode = await QRCodeGenerator.toDataURL(
    `http://tsetlabs.twzeefsd.com/application/${application._id}`
  );

  application.QRCode = QRCode;
  await application.save();

  application.user = await User.findById(req.user._id);

  let airlines;
  switch (application.airlines) {
    case "Badr":
      airlines = "بدر";
      break;
    case "Tarko":
      airlines = "تاركو";
      break;
    case "Eithiopian":
      airlines = "الاثيوبية";
      break;
    case "Fly Dubai":
      airlines = "فلاي دبي";
      break;
    case "Qatar":
      airlines = "القطرية";
      break;
    case "Fly Emarits":
      airlines = "الاماراتية";
      break;
    case "Fly Emarits":
      airlines = "الاماراتية";
      break;
    case "Itihad":
      airlines = "الاتحاد";
      break;
    case "Nas":
      airlines = "فلاي ناس";
      break;
    case "Saudi":
      airlines = "السعودية";
      break;
    default:
      break;
  }

  const app = {
    name: application.name,
    ename: application.ename,
    testDate: application.testDate,
    flightDate: application.flightDate,
    phoneNumber: application.phoneNumber,
    passportNumber: application.passportNumber,
    destination: application.destination,
    QRCode: application.QRCode,
    airlines: airlines,
    user: application.user,
  };

  htmlPdf.create(pdf(app), {}).toFile("receipt.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.status(200).json({
      success: true,
      data: application,
    });
  });
});

exports.downloadApplicationReceipt = asyncHandler(async (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../receipt.pdf"));
});

// @desc      Create client receipt
// @route     POST /api/v1/clients/:clientId/createreceipt
// @access    Private/Agency/Agent/Admin
exports.printApplicationReceipt = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(
    req.params.applicationId
  ).populate("user");
  if (!application) {
    return next(new ErrorResponse(`لم يتم العثور على العميل`, 404));
  }
  switch (application.airlines) {
    case "Badr":
      application.airlines = "بدر";
      break;
    case "Tarko":
      application.airlines = "تاركو";
      break;
    case "Eithiopian":
      application.airlines = "الاثيوبية";
      break;
    case "Fly Dubai":
      application.airlines = "فلاي دبي";
      break;
    case "Qatar":
      application.airlines = "القطرية";
      break;
    case "Fly Emarits":
      application.airlines = "الاماراتية";
      break;
    case "Fly Emarits":
      application.airlines = "الاماراتية";
      break;
    case "Itihad":
      application.airlines = "الاتحاد";
      break;
    case "Nas":
      application.airlines = "فلاي ناس";
      break;
    case "Saudi":
      application.airlines = "السعودية";
      break;
    case "Turkey":
      application.airlines = "التركية";
      break;
    default:
      break;
  }
  htmlPdf.create(pdf(application), {}).toFile("receipt.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// @desc      Add visa
// @route     POST /api/v1/agencies/:agencyId/visas
// @access    Private
exports.updateApplication = asyncHandler(async (req, res, next) => {
  const applicationStateCheck = await Application.findById(req.params.id);
  if (!applicationStateCheck) {
    return next(new ErrorResponse(`لم يتم العثور على الطلب`, 404));
  }
  if (
    applicationStateCheck.state === "tested" &&
    req.body.state === "registered" &&
    req.user.role !== "super admin"
  ) {
    return next(new ErrorResponse(`لا يمكن تحويل الحالة لحالة سابقة`, 400));
  }
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
