import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import Joi from "joi";
import React, { useState } from "react";
import messages from "../../../helpers/messages";
import { addApplication } from "../../../redux/actions/applications_actions";
import GeneralInfoForm from "./GeneralInfoForm";
import ApplicationInfoReview from "./ApplicationInfoReview";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["البيانات الاساسية", "مراجعة البيانات"];

export default function AddApplicationForm(props) {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);

  const [activeStep, setActiveStep] = useState(0);

  const [application, setApplication] = useState({
    ename: "",
    airlines: "",
    type: "",
    location: "",
    otherAirlines: "",
    destination: "",
    phoneNumber: "",
    passportNumber: "",
    flightTime: "",
    flightDate: new Date(),
    testDate: new Date(),
  });

  const [errors, setErrors] = useState({
    ename: false,
    airlines: false,
    type: false,
    destination: false,
    phoneNumber: false,
    passportNumber: false,
    flightTime: false,
    flightDate: false,
    testDate: false,
  });

  const generalFormSchema = Joi.object()
    .keys({
      ename: Joi.string().min(6).max(60).required().label("EName").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال الاسم باللغة الانجليزية" }; 
              case "string.min":
              return { message: "يجب الا تقل الاسم باللغة الانجليزية عن 6 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز الاسم باللغة الانجليزية 60 حرف" };                 
          }
        })
      }),
       type: Joi.string().valid(["internal", "external"]).required().label("Type").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال نوع الفحص" };                 
          }
        })
      }),
      destination: Joi.string().min(3).max(25).required().label("Destination").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال الوجهة" }; 
              case "string.min":
              return { message: "يجب الا تقل الوجهة المدخلة عن 3 حروف" }; 
              case "string.max":
              return { message: "يجب الا تتجاوز الوجهة المدخلة 25 حرف" };                 
          }
        })
      }),
      airlines: Joi.string().required().valid([ "Sudanair",
      "Badr",
      "Tarko",
      "Eithiopian",
      "Turkey",
      "Fly Dubai",
      "Qatar",
      "Fly Emarits",
      "Itihad",
      "Nas",
      "Saudi",
      "other",]).label("Airlines").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال خطوط الطيران" };                 
          }
        })
      }),
       phoneNumber: Joi.string().min(9).max(9).required().label("PhoneNumber").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
             case "any.empty":
              return { message: "الرجاء ادخال رقم الهاتف" };  
              case "string.min":
              return { message: "يجب ادخال رقم الهاتف من غير صفر البداية و الا يقل الرقم عن 9 ارقام" }; 
              case "string.max":
              return { message: "يجب ادخال رقم الهاتف من غير صفر البداية و الا يتجاوز الرقم عن 9 ارقام" };                 
          }
        })
      }),
      passportNumber: Joi.string()
        .min(6)
        .max(15)
        .required()
        .label("PassportNumber").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال رقم الجواز" }; 
              case "string.min":
              return { message: "يجب الا يقل رقم الجواز المدخلة عن 6 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز رقم الجواز المدخلة 15 حرف" };                 
          }
        })
      }),
      flightDate: Joi.date().required().label("FlightDate").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال تاريخ الرحلة " };
          }
        })
      }),
       flightTime: Joi.string().required().label("FlightTime").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال زمن الرحلة" };
          }
        })
      }),
      testDate: Joi.date().required().label("TestDate").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال تاريخ الحجز للفحص" };
          }
        })
      }),
     
    })
    .unknown(true);

  const validateGeneralForm = () => {
    const { error } = Joi.validate(application, generalFormSchema, {
      abortEarly: true,
    });
    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
       for (var key in errors) {
          messages.error(errors[key]);
      }
      setErrors(errors);
      return error;
    }
    setErrors({
      ename: false,
      airlines: false,
      destination: false,
      type: false,
      passportNumber: false,
      flightTime: false,
      flightDate: false,
      testDate: false,
      phoneNumber: false,
    });
  };

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleFlightDateChange = (flightDate) => {
    setApplication({ ...application, flightDate });
  };

  const handleTestDateChange = (testDate) => {
    setApplication({ ...application, testDate });
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        if (validateGeneralForm()) break;
        setActiveStep(1);
        break;
      case 1:
        try {
          const submit = {
            ...application,
          };
          const result = await addApplication(submit);
          if (result && role === "agency") {
            messages.success("تم إضافة طلب الفحص");
            props.history.push(`/my-applications`);
          }
          if (result && (role === "lab" || role === "admin" || role === "super admin")) {
            messages.success("تم إضافة طلب الفحص");
            props.history.push(`/all-applications`);
          } 
        } catch (error) {
          messages.error(error);
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <GeneralInfoForm
            application={application}
            errors={errors}
            onChange={handleChange}
            onFlightDateChange={handleFlightDateChange}
            onTestDateChange={handleTestDateChange}
          />
        );
      case 1:
        return <ApplicationInfoReview application={application} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return role === "admin" || role === "agency" || role === "super admin" ? (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            اضافة طلب فحص
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  لقد تم اضافة الطلب بنجاح
                </Typography>
                <Typography variant="subtitle1">
                  {/* Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped. */}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      رجوع
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "اضافة الطلب" : "التالي"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </main>
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
}
