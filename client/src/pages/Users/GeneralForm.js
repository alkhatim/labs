import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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

export default function GeneralForm({ user, errors, onChange }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        بيانات المستخدم
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="userName"
            error={errors.userName}
            label="اسم المستخدم"
            onChange={onChange}
            value={user.userName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="name"
            error={errors.name}
            label="اسم الوكالة\المعمل"
            onChange={onChange}
            value={user.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="ownerName"
            error={errors.ownerName}
            label="اسم المالك"
            onChange={onChange}
            value={user.ownerName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="password"
            type="password"
            error={errors.password}
            label="كلمة المرور"
            onChange={onChange}
            value={user.password}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="password2"
            type="password"
            error={errors.password2}
            label="تأكيد كلمة المرور"
            onChange={onChange}
            value={user.password2}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="phoneNumber"
            error={errors.phoneNumber}
            label="رقم الهاتف"
            onChange={onChange}
            value={user.phoneNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.texField}
            name="email"
            error={errors.email}
            label="الايميل"
            onChange={onChange}
            value={user.email}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
