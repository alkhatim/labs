import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Joi from "joi";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import messages from "../../helpers/messages";
import { addUser } from "../../redux/actions/users_actions";
import GeneralForm from "./AdminGeneralForm";
import UserReview from "./AdminUserReview";

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

const steps = ["بيانات المستخدم", "مراجعة البيانات"];

export default function AddUser(props) {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);

  const [activeStep, setActiveStep] = useState(0);

  const [user, setUser] = useState({
    userName: "",
    password: "",
    password2: "",
    email: "",
    name: "",
    ownerName: "",
    phoneNumber: "",
    type: "agency",
    role: "",
  });

  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    password2: false,
    name: false,
    ownerName: false,
    phoneNumber: false,
    type: false,
    email: false,
    role: false,
  });

  const generalFormSchema = Joi.object()
    .keys({
      userName: Joi.string().min(3).max(30).required().label("Username").error((errors) => {
        return errors.map(error => {
          switch (error.type) {
            case "any.empty":
              return { message: "الرجاء ادخال اسم المستخدم" };  
              case "string.min":
              return { message: "يجب الا يقل اسم المستخدم عن 3 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز اسم المستخدم 30 حرف" };                 
          }
        })
      }),
      password: Joi.string().required().min(6).max(20).label("Password").error((errors) => {
        return errors.map(error => {
          switch (error.type) {
            case "any.empty":
              return { message: "الرجاء ادخال كلمة المرور" };  
              case "string.min":
              return { message: "يجب الا تقل كلمة المرور عن 6 حروف" }; 
              case "string.max":
              return { message: "يجب الا تتجاوز كلمة المرور 20 حرف" };                 
          }
        })
      }),
      password2: Joi.equal(Joi.ref("password")).required().label("Password"),
      name: Joi.string().min(7).max(30).required().label("Name").error((errors) => {
        return errors.map(error => {
          switch (error.type) {
            case "any.empty":
              return { message: "الرجاء ادخال الاسم" };  
              case "string.min":
              return { message: "يجب الا يقل الاسم عن 7 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز الاسم 30 حرف" };                 
          }
        })
      }),
      ownerName: Joi.string().min(7).max(30).allow("").label("Owner Name").error((errors) => {
        return errors.map(error => {
          switch (error.type) {
              case "string.min":
              return { message: "يجب الا يقل اسم المالك عن 7 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز اسم المالك 30 حرف" };                 
          }
        })
      }),
      type: Joi.string().required().valid(["recruitment office", "corporate", "agency", "organization", "diplomatic committee", "individuals", "other"])
     .label("Type").error((errors) => {
        return errors.map(error => {
         switch (error.type) { 
              case "any.empty":
              return { message: "يجب ادخال نوع الجهة" };                 
          }
        })
      }),
      phoneNumber: Joi.string().min(9).max(9).required().label("Phone Number").error((errors) => {
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
      email: Joi.string().min(6).max(50).allow("").label("Email").error((errors) => {
        return errors.map(error => {
          switch (error.type) { 
              case "string.min":
              return { message: "يجب الا تقل البريد الاليكتروني عن 6 حروف" }; 
              case "string.max":
              return { message: "يجب الا يتجاوز البريد الاليكتروني 15 حرف" };                 
          }
        })
      }),
      role: Joi.string()
        .valid(["lab", "admin", "agency", "user", "office coordinator"])
        .required()
        .label("Role"),
    })
    .unknown(true);

  const validateGeneralForm = () => {
    const { error } = Joi.validate(user, generalFormSchema, {
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
    } else
      setErrors({
        userName: false,
        password: false,
        password2: false,
        name: false,
        ownerName: false,
        phoneNumber: false,
        type: false,
        email: false,
        role: false,
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        if (validateGeneralForm()) break;
        setActiveStep(1);
        break;

      case 1:
        try {
          const result = await addUser(user);
          if (result) {
            messages.success("تم إضافة المستخدم");
            props.history.push("/all-users");
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
          <GeneralForm user={user} errors={errors} onChange={handleChange} />
        );
      case 1:
        return <UserReview user={user} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return role === "admin" || role === "super admin" ? (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            اضافة مستخدم
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
                  لقد تم اضافة المستخدم بنجاح
                </Typography>
                <Typography variant="subtitle1"></Typography>
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
                    {activeStep === steps.length - 1
                      ? "اضافة المستخدم "
                      : "التالي"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
}
