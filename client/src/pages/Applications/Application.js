import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Joi from "joi";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import DownloadIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  getApplication,
  updateApplication,
  deleteApplication,
  downloadReceipt,
} from "../../redux/actions/applications_actions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import messages from "../../helpers/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 1300,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(2),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  texField: {
    marginTop: 15,
    marginBottom: 15,
    minWidth: 100,
  },
  select: {
    minWidth: 185,
    marginTop: 15,
    marginBottom: 15,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  autoComplete: {
    minWidth: 250,
    marginTop: 15,
    marginBottom: 15,
  },
  indicator: {
    backgroundColor: "white",
    height: "5px",
  },
  textTimeField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default (props) => {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);

  const [application, setApplication] = useState({
    _id: "",
    ename: "",
    airlines: "",
    state: "",
    type: "",
    paymentStatus: "",
    order: "",
    location: "",
    destination: "",
    phoneNumber: "",
    passportNumber: "",
    flightTime: "",
    paymentMethod: "",
    receiptNumber: "",
    user: {
      type: "",
      role: "",
    },
    flightDate: new Date("12/12/1995"),
    testDate: new Date("12/12/1995"),
    receipt: "",
    receiptUrl: "",
    fees: ""
  });

  const [errors, setErrors] = useState({
    ename: false,
    airlines: false,
    state: false,
    destination: false,
    flightTime: false,
    type: false,
    phoneNumber: false,
    passportNumber: false,
    flightDate: false,
    testDate: false,
  });

  const generalFormSchema = Joi.object()
    .keys({
      ename: Joi.string().min(3).required().label("EName"),
      airlines: Joi.string().required().label("Airlines"),
      type: Joi.string().required().label("Type"),
      state: Joi.string().min(3).required().label("State"),
      flightTime: Joi.string().required().label("FlightTime"),
      destination: Joi.string().min(3).required().label("Destination"),
      passportNumber: Joi.string().min(6).required().label("PassportNumber"),
      flightDate: Joi.date().min(6).required().label("FlightDate"),
      testDate: Joi.date().min(6).required().label("TestDate"),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(7)
        .required()
        .label("phoneNumber"),
    })
    .unknown(true);

  const validateGeneralForm = () => {
    const { error } = Joi.validate(application, generalFormSchema, {
      abortEarly: false,
    });
    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      return error;
    }
    setErrors({
      ename: false,
      airlines: false,
      state: false,
      destination: false,
      type: false,
      passportNumber: false,
      flightDate: false,
      flightTime: false,
      testDate: false,
      phoneNumber: false,
    });
  };

  const [deleteModal, setDeleteModal] = React.useState(false);

  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (props.match.params.id) {
        const result = await getApplication(props.match.params.id);
        if (result) setApplication(result);
      }
    };
    fetchData();
  }, [props.match.params.id]);
  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleFlightDateChange = (flightDate) => {
    setApplication({ ...application, flightDate });
  };

  const message = `
  ?????????? ?????? ???????????????? ???? ???????? ?????????? ???????????? ?????????????????? ???????????? ?????? ?????????????? ???????? ???? ?????????? ???? ???????? ???? ???? ?????????? ????????????
  `;

  let state = "";

  switch (application.state) {
    case "registered":
      state = "???? ??????????????";
      break;
    case "tested":
      state = "???? ??????????";
      break;
    case "result issued":
      state = "???? ?????????????? ??????????????";
      break;
    case "result delivered":
      state = "???? ???????????? ??????????????";
      break;

    default:
      break;
  }

  const handleTestDateChange = (testDate) => {
    setApplication({ ...application, testDate });
  };

  const handleSave = async () => {
    if (!validateGeneralForm()) {
      try {
        const result = await updateApplication(application);
        if (result) {
          messages.success("?????? ?????????????? ??????????");
          setReadOnly(true);
        }
      } catch (error) {
        messages.error(error);
      }
    }
  };

  const handleDeleteAttempt = () => {
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteApplication(application._id);
      setDeleteModal(false);
      messages.success("???? ??????????");
      props.history.push("/my-applications");
    } catch (error) {
      messages.error(error);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setApplication({ ...application, receipt: reader.result });
      };
    } catch (error) {
      messages.error(error);
    }
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            ???????????? ??????????
          </Typography>
          <Grid container spacing={3} style={{ margin: 10 }}>
           
              <React.Fragment>
                <Tooltip title="??????????">
                  <Button onClick={() => setReadOnly(!readOnly)}>
                    <EditIcon style={{ color: "#0066cc" }} fontSize="large" />
                  </Button>
                </Tooltip>

                <Tooltip title="??????">
                  <Button onClick={handleSave}>
                    <SaveIcon style={{ color: "#3cb371" }} fontSize="large" />
                  </Button>
                </Tooltip>
              </React.Fragment>
            

            <Tooltip title="?????????? ???????????? ??????????">
              <Button onClick={async () => await downloadReceipt(application)}>
                <DownloadIcon style={{ color: "#3cb371" }} fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="?????????? ??????????">
              <Button
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?phone=249${application.phoneNumber}&text=${message}%20${state}`,
                    "_blank"
                  )
                }
              >
                <WhatsAppIcon style={{ color: "#3cb371" }} fontSize="large" />
              </Button>
            </Tooltip>
            {(role === "super admin") && (
              <Tooltip title="??????">
                <Button onClick={handleDeleteAttempt}>
                  <DeleteIcon color="secondary" fontSize="large" />
                </Button>
              </Tooltip>
            )}
          </Grid>

          <Dialog open={deleteModal} onClose={handleCloseDeleteModal}>
            <DialogContent>
              <DialogContentText>???? ?????? ?????????? ???? ?????????? ??</DialogContentText>
            </DialogContent>
            <DialogActions style={{ margin: "auto" }}>
              <Button onClick={handleCloseDeleteModal} color="primary">
                ??????????
              </Button>
              <Button onClick={handleDelete} color="secondary">
                ??????
              </Button>
            </DialogActions>
          </Dialog>
          {(role === "lab" || role === "admin" || role === "super admin") && (
            <Grid container spacing={3} style={{ margin: 10 }}>
              <Grid item xs={6} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="state">???????? ??????????</InputLabel>
                  <Select
                    labelId="state"
                    name="state"
                    disabled={readOnly}
                    value={application.state}
                    onChange={handleChange}
                  >
                    <MenuItem value="registered">???? ??????????????</MenuItem>
                    <MenuItem value="tested">???? ??????????</MenuItem>
                    <MenuItem value="result issued">
                      ???? ?????????????? ??????????????
                    </MenuItem>
                    <MenuItem value="result delivered">
                      ???? ?????????? ??????????????
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          {(role === "office coordinator" ||
            role === "admin" ||
            role === "super admin") && (
            <Grid container spacing={3} style={{ margin: 10 }}>
              <Grid item xs={6} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="paymentStatus">???????? ????????????</InputLabel>
                  <Select
                    labelId="paymentStatus"
                    name="paymentStatus"
                    disabled={readOnly}
                    value={application.paymentStatus}
                    onChange={handleChange}
                  >
                    {(application.user.type !== "agency" ||
                      application.user.type === "recruitment office") && (
                      <MenuItem value="paid">???? ????????????</MenuItem>
                    )}
                    {(application.user.type === "agency" ||
                      application.user.type === "recruitment office") && (
                      <MenuItem value="paid with commission">
                        ???? ???????????? ???? ??????????????
                      </MenuItem>
                    )}
                    {(application.user.type === "agency" ||
                      application.user.type === "recruitment office") && (
                      <MenuItem value="paid without commission">
                        ???? ???????????? ???????? ??????????????
                      </MenuItem>
                    )}
                    <MenuItem value="not paid">???? ?????? ????????????</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid dir="rtl" item xs={12}>
                 <Grid item xs={12}>
                  <TextField
                    className={classes.texField}
                    name="fees"
                    disabled={readOnly}
                    label="???????????? ??????????????"
                    onChange={handleChange}
                    value={application.fees}
                  />
                </Grid>
                <FormControl className={classes.formControl}>
                  <InputLabel id="paymentMethod">?????????? ??????????</InputLabel>
                  <Select
                    labelId="paymentMethod"
                    name="paymentMethod"
                    disabled={readOnly}
                    value={application.paymentMethod}
                    onChange={handleChange}
                  >
                    <MenuItem value="cash">??????</MenuItem>
                    <MenuItem value="transfer">?????????? ????????</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {application.paymentMethod === "transfer" && (
                <Grid item xs={12}>
                  <TextField
                    className={classes.texField}
                    name="receiptNumber"
                    disabled={readOnly}
                    label="?????? ??????????????"
                    onChange={handleChange}
                    value={application.receiptNumber}
                  />
                </Grid>
              )}
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="ename"
                disabled={readOnly || application.state === "tested"}
                error={errors.ename}
                label="?????????? ???????????? ????????????????????"
                onChange={handleChange}
                value={application.ename}
              />
            </Grid>
            <Grid dir="rtl" item xs={12}>
              <Grid dir="rtl" item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="type">?????? ??????????</InputLabel>
                  <Select
                    labelId="type"
                    name="type"
                    disabled
                    error={errors.type}
                    value={application.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="internal">???? ????????????</MenuItem>
                    <MenuItem value="external">?????? ??????????</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid dir="rtl" item xs={6}>
                <small>?????? ???? ???????????? - ???????? ????????????</small>
              </Grid>
            </Grid>
            {application.type === "external" && (
              <Grid item xs={12}>
                <TextField
                  className={classes.texField}
                  name="location"
                  disabled
                  label="???????? ?????? ????????????"
                  onChange={handleChange}
                  value={application.location}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.texField}
                name="destination"
                disabled={readOnly || application.state === "tested"}
                error={errors.destination}
                label="???????? ??????????"
                value={application.destination}
                onChange={handleChange}
              />
            </Grid>
            <Grid dir="rtl" item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="airlines">???????? ??????????????</InputLabel>
                <Select
                  labelId="airlines"
                  name="airlines"
                  disabled={readOnly || application.state === "tested"}
                  value={application.airlines}
                  onChange={handleChange}
                >
                  <MenuItem value="Sudanair">?????????? ??????</MenuItem>
                  <MenuItem value="Badr">??????</MenuItem>
                  <MenuItem value="Tarko">??????????</MenuItem>
                  <MenuItem value="Eithiopian">??????????????????</MenuItem>
                  <MenuItem value="Turkey">??????????????</MenuItem>
                  <MenuItem value="Fly Dubai">???????? ??????</MenuItem>
                  <MenuItem value="Qatar">??????????????</MenuItem>
                  <MenuItem value="Fly Emarits">????????????????????</MenuItem>
                  <MenuItem value="Itihad">??????????????</MenuItem>
                  <MenuItem value="Nas"> ???????? ??????</MenuItem>
                  <MenuItem value="Saudi">????????????????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                className={classes.texField}
                name="phoneNumber"
                disabled={readOnly || application.state === "tested"}
                error={errors.phoneNumber}
                label="?????? ????????????"
                onChange={handleChange}
                value={application.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                className={classes.texField}
                name="passportNumber"
                disabled={readOnly || application.state === "tested"}
                error={errors.passportNumber}
                label="?????? ????????????"
                onChange={handleChange}
                value={application.passportNumber}
              />
            </Grid>

            <Grid>
              <form className={classes.container} noValidate>
                <TextField
                  id="time"
                  name="flightTime"
                  label="?????? ???????????? ????????????"
                  type="time"
                  defaultValue="12:00"
                  disabled={readOnly || application.state === "tested"}
                  className={classes.textTimeField}
                  onChange={handleChange}
                  error={errors.flightTime}
                  value={application.flightTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    disabled={readOnly || application.state === "tested"}
                    id="date-picker-inline"
                    label="?????????? ??????????"
                    value={application.flightDate}
                    onChange={handleFlightDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      marginRight: 20,
                      marginTop: 35,
                      color: "gray",
                    }}
                  >
                    ?????? ?????????? ?????????? ?????????? ????????
                  </span>
                </div>
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    disabled={readOnly || application.state === "tested"}
                    id="date-picker-inline"
                    label="?????????? ??????????"
                    value={application.testDate}
                    onChange={handleTestDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      marginRight: 20,
                      marginTop: 35,
                      color: "gray",
                    }}
                  >
                    ?????? ?????????? ?????????? ?????????? ????????
                  </span>
                </div>
              </MuiPickersUtilsProvider>
            </Grid>
           {(role === "super admin" || role === "admin" || role === "office coordinator") && ( <Grid item xs={12} sm={12}>
              <input
                type="file"
                name="receipt"
                accept=".png,.jpg,.jpeg,.svg,.gif"
                // disabled={readOnly || application.state === "tested"}
                label="?????????? ???? ??????"
                onChange={handleUpload}
              />
            </Grid>)}
          </Grid>
        </Paper>
      {application.receiptUrl && (  <Paper className={classes.paper}>
          <Grid container>
            <Grid xs={12} align="center" alignContent="center" alignItems="center">
              <img src={application.receiptUrl} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "800px", width: "360px"}}/>
            </Grid>

          </Grid>
          </Paper>)}
      </main>
    </React.Fragment>
  );
};
