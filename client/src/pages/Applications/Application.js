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
    name: "",
    name1: "",
    name2: "",
    name3: "",
    name4: "",
    ename1: "",
    ename2: "",
    ename3: "",
    ename4: "",
    airlines: "",
    state: "",
    type: "",
    location: "",
    destination: "",
    phoneNumber: "",
    passportNumber: "",
    flightTime: "",
    flightDate: new Date("8/7/2030"),
    testDate: new Date("8/7/2030"),
  });

  const [errors, setErrors] = useState({
    name1: false,
    name2: false,
    name3: false,
    name4: false,
    ename1: false,
    ename2: false,
    ename3: false,
    ename4: false,
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
      name1: Joi.string().min(3).required().label("Name1"),
      name2: Joi.string().min(3).required().label("Name2"),
      name3: Joi.string().min(3).required().label("Name3"),
      name4: Joi.string().min(3).required().label("Name4"),
      ename1: Joi.string().min(3).required().label("EName1"),
      ename2: Joi.string().min(3).required().label("EName2"),
      ename3: Joi.string().min(3).required().label("EName3"),
      ename4: Joi.string().min(3).required().label("EName4"),
      airlines: Joi.string().required().label("Airlines"),
      type: Joi.string().required().label("Type"),
      state: Joi.string().min(3).required().label("State"),
      flightTime: Joi.string().min(3).required().label("FlightTime"),
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
      name1: false,
      name2: false,
      name3: false,
      name4: false,
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
  معامل تست بالتعاون مع شركة توظيف تشكركم لاختيارها لاجراء فحص الكرونا ونود ان نعلمك ان فحصك قد تم حويله للحالة
  `;

  let state = "";

  switch (application.state) {
    case "registered":
      state = "تم التسجيل";
      break;
    case "tested":
      state = "تم الفحص";
      break;
    case "result issued":
      state = "تم استخراج النتيجة";
      break;
    case "result delivered":
      state = "تم استلام النتيجة";
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
        await updateApplication(application);
        messages.success("تمت العملية بنجاح");
        setReadOnly(true);
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
      messages.success("تم المسح");
      props.history.push("/my-applications");
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
            تفاصيل الفحص
          </Typography>
          <Grid container spacing={3} style={{ margin: 10 }}>
            <Tooltip title="تعديل">
              <Button onClick={() => setReadOnly(!readOnly)}>
                <EditIcon style={{ color: "#0066cc" }} fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="حفظ">
              <Button onClick={handleSave}>
                <SaveIcon style={{ color: "#3cb371" }} fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="طباعة بيانات الطلب">
              <Button onClick={async () => await downloadReceipt(application)}>
                <DownloadIcon style={{ color: "#3cb371" }} fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="إرسال إشعار">
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
            {(application.state === "registered" ||
              role === "lab" ||
              role === "admin" ||
              role === "user") && (
              <Tooltip title="مسح">
                <Button onClick={handleDeleteAttempt}>
                  <DeleteIcon color="secondary" fontSize="large" />
                </Button>
              </Tooltip>
            )}
          </Grid>

          <Dialog open={deleteModal} onClose={handleCloseDeleteModal}>
            <DialogContent>
              <DialogContentText>هل أنت متأكد من المسح ؟</DialogContentText>
            </DialogContent>
            <DialogActions style={{ margin: "auto" }}>
              <Button onClick={handleCloseDeleteModal} color="primary">
                إلغاء
              </Button>
              <Button onClick={handleDelete} color="secondary">
                نعم
              </Button>
            </DialogActions>
          </Dialog>
          {(role === "lab" || role === "admin") && (
            <Grid container spacing={3} style={{ margin: 10 }}>
              <Grid item xs={6} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="state">حالة الفحص</InputLabel>
                  <Select
                    labelId="state"
                    name="state"
                    disabled={readOnly}
                    value={application.state}
                    onChange={handleChange}
                  >
                    <MenuItem value="registered">تم التسجيل</MenuItem>
                    <MenuItem value="tested">تم الفحص</MenuItem>
                    <MenuItem value="result issued">
                      تم استخراج النتيجة
                    </MenuItem>
                    <MenuItem value="result delivered">
                      تم تسليم النتيجة
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="name1"
                disabled={readOnly}
                error={errors.name1}
                label="الاسم الاول"
                onChange={handleChange}
                value={application.name1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="name2"
                disabled={readOnly}
                error={errors.name2}
                label="الاسم الثاني"
                onChange={handleChange}
                value={application.name2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="name3"
                error={errors.name3}
                disabled={readOnly}
                label="الاسم الثالث"
                onChange={handleChange}
                value={application.name3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="name4"
                disabled={readOnly}
                error={errors.name4}
                label="الاسم الرابع"
                onChange={handleChange}
                value={application.name4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="ename1"
                disabled={readOnly}
                error={errors.ename1}
                label="الاسم الاول باللغة الانجليزية"
                onChange={handleChange}
                value={application.ename1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="ename2"
                disabled={readOnly}
                error={errors.ename2}
                label="الاسم الثاني باللغة الانجليزية"
                onChange={handleChange}
                value={application.ename2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="ename3"
                disabled={readOnly}
                error={errors.ename3}
                label="الاسم الثالث باللغة الانجليزية"
                onChange={handleChange}
                value={application.ename3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.texField}
                name="ename4"
                disabled={readOnly}
                error={errors.ename4}
                label="الاسم الرابع باللغة الانجليزية "
                onChange={handleChange}
                value={application.ename4}
              />
            </Grid>
            <Grid dir="rtl" item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="type">نوع الفحص</InputLabel>
                <Select
                  labelId="type"
                  name="type"
                  disabled
                  error={errors.type}
                  value={application.type}
                  onChange={handleChange}
                >
                  <MenuItem value="internal">في المعمل</MenuItem>
                  <MenuItem value="external">فحص خارجي</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {application.type === "external" && (
              <Grid item xs={12}>
                <TextField
                  className={classes.texField}
                  name="location"
                  disabled
                  label="مكان اخذ العينة"
                  onChange={handleChange}
                  value={application.location}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.texField}
                name="destination"
                disabled={readOnly}
                error={errors.destination}
                label="وجهة السفر"
                value={application.destination}
                onChange={handleChange}
              />
            </Grid>
            <Grid dir="rtl" item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="airlines">خطوط الطيران</InputLabel>
                <Select
                  labelId="airlines"
                  name="airlines"
                  disabled={readOnly}
                  value={application.airlines}
                  onChange={handleChange}
                >
                  <MenuItem value="Badr">بدر</MenuItem>
                  <MenuItem value="Tarko">تاركو</MenuItem>
                  <MenuItem value="Eithiopian">الاثيوبية</MenuItem>
                  <MenuItem value="Turkey">التركية</MenuItem>
                  <MenuItem value="Fly Dubai">فلاي دبي</MenuItem>
                  <MenuItem value="Qatar">القطرية</MenuItem>
                  <MenuItem value="Fly Emarits">الاماراتية</MenuItem>
                  <MenuItem value="Itihad">الاتحاد</MenuItem>
                  <MenuItem value="Nas"> فلاي ناس</MenuItem>
                  <MenuItem value="Saudi">السعودية</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                className={classes.texField}
                name="phoneNumber"
                disabled={readOnly}
                error={errors.phoneNumber}
                label="رقم الهاتف"
                onChange={handleChange}
                value={application.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                className={classes.texField}
                name="passportNumber"
                disabled={readOnly}
                error={errors.passportNumber}
                label="رقم الجواز"
                onChange={handleChange}
                value={application.passportNumber}
              />
            </Grid>

            <Grid>
              <form className={classes.container} noValidate>
                <TextField
                  id="time"
                  name="flightTime"
                  label="زمن الحضور للمطار"
                  type="time"
                  defaultValue="12:00"
                  disabled={readOnly}
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
                    disabled={readOnly}
                    id="date-picker-inline"
                    disablePast
                    label="تاريخ السفر"
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
                    يجب تحديد تاريخ السفر بدقة
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
                    disabled={readOnly}
                    id="date-picker-inline"
                    disablePast
                    label="تاريخ الفحص"
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
                    يجب تحديد تاريخ الفحص بدقة
                  </span>
                </div>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};
