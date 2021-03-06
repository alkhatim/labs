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
    width: "65%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textTimeField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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
            name="ename"
            error={errors.ename}
            label="الاسم باللغة الانجليزية"
            onChange={onChange}
            value={application.ename}
          />
        </Grid>
        <Grid dir="rtl" item xs={12}>
          <Grid dir="rtl" item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="type">نوع الفحص</InputLabel>
              <Select
                labelId="type"
                name="type"
                error={errors.type}
                value={application.type}
                onChange={onChange}
              >
                <MenuItem value="internal">في المعمل</MenuItem>
                <MenuItem value="external">فحص خارجي</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid dir="rtl" item xs={6}>
            <small>فحص في المعمل - خدمة منزلية</small>
          </Grid>
        </Grid>
        {application.type === "external" && (
          <Grid item xs={12}>
            <TextField
              className={classes.texField}
              name="location"
              label="مكان اخذ العينة"
              onChange={onChange}
              value={application.location}
            />
          </Grid>
        )}
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
              <MenuItem value="Sudanair">سودان اير</MenuItem>
              <MenuItem value="Badr">بدر</MenuItem>
              <MenuItem value="Tarko">تاركو</MenuItem>
              <MenuItem value="Eithiopian">الاثيوبية</MenuItem>
              <MenuItem value="Turkey">التركية</MenuItem>
              <MenuItem value="Fly Dubai">فلاي دبي</MenuItem>
              <MenuItem value="Qatar">القطرية</MenuItem>
              {/* <MenuItem value="Fly Emarits">الاماراتية</MenuItem> */}
              <MenuItem value="Itihad">الاتحاد</MenuItem>
              <MenuItem value="Nas"> فلاي ناس</MenuItem>
              <MenuItem value="Saudi">السعودية</MenuItem>
              <MenuItem value="other">اخرى</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {application.airlines === "other" && (
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.texField}
              name="otherAirlines"
              error={errors.otherAirlines}
              label="اسم الخطوط"
              onChange={onChange}
              value={application.otherAirlines}
            />
          </Grid>
        )}
        <Grid item xs={6} sm={12}>
          <TextField
            className={classes.texField}
            name="phoneNumber"
            error={errors.phoneNumber}
            label="رقم الهاتف"
            onChange={onChange}
            value={application.phoneNumber}
          />
          <Grid item xs={6} sm={12}>
            <div>
            <small>
              أدخل رقم الهاتف الخاص بالعميل بدون صفر البداية, مثال: 9123000000
            </small>
            </div>
            <div>
            <small>يجب الا يتكرر رقم الهاتف</small>
            </div>
            <div>
            <small>رقم الهاتف يجب ان يكون 9 ارقام</small>
            </div>
          </Grid>
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
          <Grid item xs={6}>
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
              </div>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <small>يجب تحديد تاريخ السفر بدقة</small>
          </Grid>
        </Grid>
        <Grid>
          <form className={classes.container} noValidate>
            <TextField
              id="time"
              name="flightTime"
              label="زمن الحضور للمطار"
              type="time"
              defaultValue="12:00"
              className={classes.textTimeField}
              onChange={onChange}
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
          <Grid item xs={6}>
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
              </div>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid>
            <small>
              يجب تحديد تاريخ الفحص بدقة في فترة اقلها 24 ساعة قبل حضور المطار
            </small>
          </Grid>
        </Grid>
         <Grid item xs={12}>
          <TextField
            className={classes.texField}
            name="notes"
            label="ملاحظات"
            onChange={onChange}
            value={application.notes}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
