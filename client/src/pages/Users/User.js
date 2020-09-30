import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import Dialog from "@material-ui/core/Dialog";
import {
  getUser,
  updateUser,
  changePassword,
} from "../../redux/actions/users_actions";
import messages from "../../helpers/messages";
import { id } from "date-fns/locale";

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
      width: 1200,
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
}));

export default (props) => {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);

  const [user, setUser] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    email: "",
    photo: "",
    role: "",
  });

  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordModal, setPasswordModal] = React.useState(false);

  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (props.match.params.id) {
        const userData = await getUser(props.match.params.id);
        if (userData) setUser(userData);
      }
    };
    fetchData();
  }, [props.match.params.id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(props.match.params.id, user);
      messages.success("تمت العملية بنجاح");
      setReadOnly(true);
    } catch (error) {
      messages.error(error);
    }
  };

  const handleChangePasswordAttempt = () => {
    setPasswordModal(true);
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(user._id, newPassword);
      setPasswordModal(false);
      messages.success("تم");
    } catch (error) {
      messages.error(error);
    }
  };

  const handleClosePasswordModal = () => {
    setPasswordModal(false);
  };

  return role === "admin" ? (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            تفاصيل المستخدم
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
          </Grid>

          <Grid
            container
            spacing={3}
            style={{ minHeight: 300, padding: 10, marginTop: 20 }}
          >
            <Grid item sm={6}>
              <Grid item>
                <TextField
                  className={classes.texField}
                  name="userName"
                  label="إسم المستخدم"
                  disabled={readOnly}
                  onChange={handleChange}
                  value={user.userName}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.texField}
                  name="phoneNumber"
                  onChange={handleChange}
                  label="رقم الهاتف"
                  disabled={readOnly}
                  value={user.phoneNumber}
                />
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="role">الصلاحية</InputLabel>
                  <Select
                    labelId="role"
                    name="role"
                    disabled={readOnly}
                    value={user.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">ادمن</MenuItem>
                    <MenuItem value="lab">موظف معمل</MenuItem>
                    <MenuItem value="agency">وكالة</MenuItem>
                    <MenuItem value="user">عميل</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid item>
                <TextField
                  className={classes.texField}
                  name="name"
                  label="الإسم"
                  disabled={readOnly}
                  onChange={handleChange}
                  value={user.name}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.texField}
                  name="email"
                  label="الإيميل"
                  disabled={readOnly}
                  onChange={handleChange}
                  value={user.email}
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            onClick={handleChangePasswordAttempt}
            variant="contained"
            color="primary"
            disabled={readOnly}
          >
            تغير كلمة المرور
          </Button>

          <Dialog
            open={passwordModal}
            onClose={handleClosePasswordModal}
            dir="rtl"
          >
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    className={classes.texField}
                    name="newPassword"
                    type="password"
                    onChange={handlePasswordChange}
                    label="كلمة المرور الجديدة"
                    value={newPassword.newPassword}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.texField}
                    name="confirmPassword"
                    type="password"
                    onChange={handlePasswordChange}
                    label="تأكيد كلمة المرور"
                    value={newPassword.confirmPassword}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions style={{ margin: "auto" }}>
              <Button onClick={handleChangePassword} color="secondary">
                تأكيد
              </Button>
              <Button onClick={handleClosePasswordModal} color="primary">
                إلغاء
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </main>
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
};
