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
import GeneralForm from "./GeneralForm";
import AgencyUserReview from "./UserReview";

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

  const [activeStep, setActiveStep] = useState(0);

  const isLoggedIn = useSelector((store) => store.authReducer.isLoggedIn);
  const isLoading = useSelector((store) => store.authReducer.isLoading);

  if (isLoggedIn && !isLoading) {
    return <Redirect to="/dashboard" />;
  }

  const [user, setUser] = useState({
    userName: "",
    password: "",
    password2: "",
    email: "",
    name: "",
    ownerName: "",
    phoneNumber: "",
    role: "agency",
  });

  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    password2: false,
    name: false,
    ownerName: false,
    phoneNumber: false,
    email: false,
    photo: false,
    role: false,
  });

  const generalFormSchema = Joi.object()
    .keys({
      userName: Joi.string().min(3).max(20).required().label("Username"),
      password: Joi.string().min(6).max(20).label("Password"),
      password2: Joi.equal(Joi.ref("password")).required().label("Password"),
      name: Joi.string().required().label("Name"),
      ownerName: Joi.string().required().label("Owner Name"),
      phoneNumber: Joi.string().min(9).max(14).required().label("Phone Number"),
      email: Joi.string().required().label("Email"),
      role: Joi.string()
        .valid(["lab", "admin", "agency", "user"])
        .required()
        .label("Role"),
    })
    .unknown(true);

  const validateGeneralForm = () => {
    const { error } = Joi.validate(user, generalFormSchema, {
      abortEarly: false,
    });
    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
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
        email: false,
        photo: false,
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
          messages.success("تم إضافة المستخدم");
          if (result) props.history.push("/login");
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
        return <AgencyUserReview user={user} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
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
  );
}
