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
const Credit = require("../models/Credit");

exports.getApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find().populate("user");
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getMyApplications = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({
    user: req.user.id,
  }).populate("user");
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getMyApplicationsNotPaid = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({
    user: req.user.id,
    agencyPaymentStatus: "not paid",
  }).populate("user");
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getAgenciesApplicationsNotPaid = asyncHandler(
  async (req, res, next) => {
    const applications = await Application.find({
      agencyPaymentStatus: "not paid",
    }).populate("user");
    res.status(200).json({
      success: true,
      data: applications,
    });
  }
);

exports.getMyApplicationsPaid = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({
    user: req.user.id,
    agencyPaymentStatus: "paid",
  }).populate("user");
  res.status(200).json({
    success: true,
    data: applications,
  });
});

exports.getAgenciesApplicationsPaid = asyncHandler(async (req, res, next) => {
  const applications = await Application.find({
    agencyPaymentStatus: "paid",
  }).populate("user");
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
    const paidApplications = await Application.find({
      user: req.user.id,
      agencyPaymentStatus: "paid",
    });
    const notPaidApplications = await Application.find({
      user: req.user.id,
      agencyPaymentStatus: "not paid",
    });

    res.status(200).json({
      success: true,
      registeredCount: registeredApplications.length,
      testedCount: testedApplications.length,
      paidApplications: paidApplications.length,
      notPaidApplications: notPaidApplications.length,
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
    const paidApplications = await Application.find({
      agencyPaymentStatus: "paid",
    });
    const notPaidApplications = await Application.find({
      agencyPaymentStatus: "not paid",
    });

    res.status(200).json({
      success: true,
      registeredCount: registeredApplications.length,
      testedCount: testedApplications.length,
      paidApplications: paidApplications.length,
      notPaidApplications: notPaidApplications.length,
    });
  }
);

exports.getApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id).populate("user");
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
  req.body.paymentStatus = "not paid";
  req.body.agencyPaymentStatus = "not paid";
  req.body.labPaymentStatus = "not paid";
  req.body.passportNumber = req.body.passportNumber.toUpperCase().trim();

  //Calculating Order:
  var start = new Date(req.body.testDate);
  start.setHours(0, 0, 0, 0);
  var end = new Date(req.body.testDate);
  end.setHours(23, 59, 59, 999);
  const applications = await Application.find({
    testDate: { $gte: start, $lt: end },
  });
  if (applications.length !== 0) {
    const latestApplication = applications[applications.length - 1];
    req.body.order = latestApplication.order + 1;
  } else {
    req.body.order = 1;
  }

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
    case "Sudanair":
      airlines = "سودان اير";
      break;
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

  let paymentStatus;
  switch (application.paymentStatus) {
    case "paid":
      paymentStatus = "مسدد";
      break;
    case "not paid":
      paymentStatus = "غير مسدد";
      break;
    default:
      break;
  }

  const app = {
    name: application.name,
    ename: application.ename,
    testDate: application.testDate,
    flightDate: application.flightDate,
    flightTime: application.flightTime,
    phoneNumber: application.phoneNumber,
    passportNumber: application.passportNumber,
    destination: application.destination,
    QRCode: application.QRCode,
    order: application.order,
    airlines: airlines,
    paymentStatus: paymentStatus,
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
    case "Sudanair":
      airlines = "سودان اير";
      break;
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
  switch (application.paymentStatus) {
    case "paid":
      application.paymentStatus = "مسدد";
      break;
    case "not paid":
      application.paymentStatus = "غير مسدد";
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
  const applicationStateCheck = await Application.findById(
    req.params.id
  ).populate("user");
  if (!applicationStateCheck) {
    return next(new ErrorResponse(`لم يتم العثور على الطلب`, 404));
  }
   if (
     applicationStateCheck.user._id.toString() !== req.user.id &&
     (req.user.role !== "admin" &&
     req.user.role !== "super admin" &&
     req.user.role !== "lab" &&
     req.user.role !== "office coordinator")
   ) {
     return next(new ErrorResponse(`غير مصرح باتمام العملية`, 403));
   }
  if (
    applicationStateCheck.state === "tested" &&
    req.body.state === "registered" &&
    req.user.role !== "super admin"
  ) {
    return next(new ErrorResponse(`لا يمكن تحويل الحالة لحالة سابقة`, 400));
  }
  if (
    (applicationStateCheck.paymentStatus === "paid" ||
    applicationStateCheck.paymentStatus === "paid without commission" ||
    applicationStateCheck.paymentStatus === "paid with commission")
    &&
    req.body.paymentStatus === "not paid" &&
    req.user.role !== "super admin"
  ) {
    return next(new ErrorResponse(`لا يمكن تحويل الحالة لحالة سابقة`, 400));
  }
  if (
    req.body.paymentStatus === "paid" ||
    req.body.paymentStatus === "paid without commission"
  )
  {
     const newApplication = await Application.findByIdAndUpdate(
       req.params.id,
       { ...req.body, agencyPaymentStatus: "paid" },
       {
         upsert: true,
         runValidators: true,
         setDefaultsOnInsert: true,
         context: "query",
       }
     );
    }else {
      const newApplication = await Application.findByIdAndUpdate(
       req.params.id,
       { ...req.body, agencyPaymentStatus: "not paid" },
       {
         upsert: true,
         runValidators: true,
         setDefaultsOnInsert: true,
         context: "query",
       }
     );
    }
   

  if (
    (req.body.paymentStatus === "paid" ||
     req.body.paymentStatus === "paid without commission" || 
     req.body.paymentStatus === "paid with commission" ) &&
    applicationStateCheck.paymentStatus === "not paid"
  ) {
    const credit = {};
    if (
      applicationStateCheck.type === "internal" &&
      (applicationStateCheck.user.type === "agency" ||
        applicationStateCheck.user.type === "recruitment office")
    ) {
      const credit = Credit({
        application: req.params.id,
        paymentDate: new Date(),
        agency: applicationStateCheck.user,
        lab: 11500,
        mazin: 125,
        moniem: 125,
      });
      await credit.save();
    } else if (
      applicationStateCheck.type === "internal" &&
      (applicationStateCheck.user.type !== "agency" ||
        applicationStateCheck.user.type !== "recruitment office")
    ) {
      const credit = Credit({
        application: req.params.id,
        paymentDate: new Date(),
        agency: applicationStateCheck.user,
        lab: 11500,
        mazin: 250,
        moniem: 250,
      });
      await credit.save();
    } else {
      const credit = Credit({
        application: req.params.id,
        paymentDate: new Date(),
        agency: applicationStateCheck.user,
        lab: 14000,
        mazin: 250,
        moniem: 250,
      });
      await credit.save();
    }
  }

  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`No visa found`, 404));
  }
  res.status(201).json({
    success: true,
    data: application,
  });
});

exports.payAgencyApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`هذا الفحص لم يعد موجودا`, 404));
  }
  application.agencyPaymentStatus = "paid";
  await application.save();
  res.status(200).json({
    success: true,
    data: application,
  });
});

exports.labPaidForApplications = asyncHandler(async (req, res, next) => {
  req.body.forEach(async (app) => {
    const application = await Application.findById(app._id);
    if (!application) {
      return next(new ErrorResponse(`هذا الفحص لم يعد موجودا`, 404));
    }
    application.labPaymentStatus = "paid";
    await application.save();
  });
  res.status(200).json({
    success: true,
  });
});

exports.getApplicationsByDates = asyncHandler(async (req, res, next) => {
  var start = new Date(req.body.startDate);
  start.setHours(0, 0, 0, 0);
  var end = new Date(req.body.endDate);
  end.setHours(23, 59, 59, 999);
  const datedApplications = await Application.find({
    $or: [
      {
        labPaymentStatus: "not paid",
        state: "tested",
        paymentStatus: "paid",
        agencyPaymentStatus: "paid",
        testDate: {
          $gte: start,
          $lt: end,
        },
      },
      {
        labPaymentStatus: "not paid",
        state: "tested",
        paymentStatus: "paid with commission",
        agencyPaymentStatus: "not paid",
        testDate: {
          $gte: start,
          $lt: end,
        },
      },
      {
        labPaymentStatus: "not paid",
        state: "tested",
        paymentStatus: "paid without commission",
        agencyPaymentStatus: "paid",
        testDate: {
          $gte: start,
          $lt: end,
        },
      },
    ],
  }).populate("user");
  const credits = await Credit.find({application: {
    $in: datedApplications.map(app => app._id)
  }});
  let lab =0, moniem =0, mazin=0;
  credits.forEach(credit => {
    lab += credit.lab;
    moniem += credit.moniem;
    mazin += credit.mazin;
  });

  res.status(200).json({
    success: true,
    count: datedApplications.length,
    data: datedApplications,
    lab, 
    moniem,
    mazin, 
    labDebit: moniem + mazin
  });
});

exports.deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorResponse(`هذا الفحص لم يعد موجودا`, 404));
  }
  if (application.state !== "registered" && (req.user.role !== "admin" || req.user.role !== "super admin")) {
    return next(new ErrorResponse(`لا يمكن مسح الطلب`, 401));
  }
  await Application.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
