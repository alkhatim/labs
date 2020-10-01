import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import http from "../helpers/http";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { loginAction } from "./../redux/actions/auth_actions";

function Copyright() {
  return (
    <React.Fragment>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="">
          معامل تست بدعم من توظيف للخدمات والانظة المتعددة
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        للتواصل والاستفسار الفني او التقني
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        email: info@twzeefsd.com
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        whatsapp only: +249999901321 - +249913711111
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        calls only: +971569548956
      </Typography>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundImage: `url(${image})`,
    // height: "100%",
    // backgroundPosition: "left",
    // backgroundRepeat: "no - repeat",
    // backgroundSize: "cover",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [formData, setformData] = useState({
    userName: "",
    password: "",
    remember: true,
  });

  const { userName, password, remember } = formData;

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store) => store.authReducer.isLoggedIn);

  if (isLoggedIn) {
    http.defaultHeader();
    return <Redirect to="/dashboard" />;
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction({ userName, password, remember }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          src="../assets/images/twzeef logo.ico"
          className={classes.avatar}
        ></Avatar>
        <Typography component="h1" variant="h5">
          شركة توظيف للانظمة والخدمات المتعددة
        </Typography>
        <Typography component="h1" variant="h5">
          نظام فحص الكرونا
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="اسم المستخدم"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={<Checkbox color="primary" />}
            label="تذكرني"
            name="remember"
            value={remember}
            onChange={handleChange}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            تسجيل الدخول
          </Button>
        </form>
      </div>
      <Link color="inherit" to="/register">
        تسجيل جديد
      </Link>{" "}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
