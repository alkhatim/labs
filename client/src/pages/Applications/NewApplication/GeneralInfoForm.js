import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";

const useStyles = makeStyles((theme) => ({
  texField: {
    width: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function GeneralInfoForm({
  application,
  errors,
  onChange,
  onFlightDateChange,
  onTestDateChange,
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        بيانات مطلوبة للفحص
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="name1"
            error={errors.name1}
            label="الاسم الاول"
            onChange={onChange}
            value={application.name1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="name2"
            error={errors.name2}
            label="الاسم الثاني"
            onChange={onChange}
            value={application.name2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="name3"
            error={errors.name3}
            label="الاسم الثالث"
            onChange={onChange}
            value={application.name3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="name4"
            error={errors.name4}
            label="الاسم الرابع"
            onChange={onChange}
            value={application.name4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="ename1"
            error={errors.ename1}
            label="الاسم الاول باللغة الانجليزية"
            onChange={onChange}
            value={application.ename1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="ename2"
            error={errors.ename2}
            label="الاسم الثاني باللغة الانجليزية"
            onChange={onChange}
            value={application.ename2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="ename3"
            error={errors.ename3}
            label="الاسم الثالث باللغة الانجليزية"
            onChange={onChange}
            value={application.ename3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="ename4"
            error={errors.ename4}
            label="الاسم الرابع باللغة الانجليزية"
            onChange={onChange}
            value={application.ename4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.texField}
            name="destination"
            error={errors.destination}
            label="وجهة السفر"
            value={application.destination}
            onChange={onChange}
          />
        </Grid>
        <Grid dir="rtl" item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="airlines">خطوط الطيران</InputLabel>
            <Select
              labelId="airlines"
              name="airlines"
              value={application.airlines}
              onChange={onChange}
            >
              <MenuItem value="Badr">بدر</MenuItem>
              <MenuItem value="Tarko">تاركو</MenuItem>
              <MenuItem value="Eithiopian">الاثيوبية</MenuItem>
              <MenuItem value="Turky">التركية</MenuItem>
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
            error={errors.phoneNumber}
            label="رقم الهاتف"
            onChange={onChange}
            value={application.phoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            className={classes.texField}
            name="passportNumber"
            error={errors.passportNumber}
            label="رقم الجواز"
            onChange={onChange}
            value={application.passportNumber}
          />
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
                id="date-picker-inline"
                disablePast
                label="تاريخ السفر"
                value={application.flightDate}
                onChange={onFlightDateChange}
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
                id="date-picker-inline"
                disablePast
                label="تاريخ الفحص"
                value={application.testDate}
                onChange={onTestDateChange}
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
    </React.Fragment>
  );
}
