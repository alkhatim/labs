import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCredits } from "../../redux/actions/credits_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 100,
    // width: 150
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: 50,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function CreditSummary() {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);
  const date = new Date();
  const today = new Date(date).toLocaleDateString();

  const [credit, setCredit] = useState({
    lab: "",
    mazin: "",
    moniem: "",
  });

  const [creditSummaryDate, setCreditSummaryDate] = useState({
    creditSummaryDate: new Date(),
  });

  // useEffect(() => {
  //   if (role === "admin" || role === "super admin") {
  //     const fetchData = async () => {
  //       const data = await getCredits(date);
  //       if (data) setCredit(data);
  //     };
  //     fetchData();
  //   }
  // }, []);

  const handleCreditSummaryDate = (cDate) => {
    setCreditSummaryDate({ creditSummaryDate: cDate });
  };

  const handleGetCredit = async () => {
    if (role === "admin" || role === "super admin") {
      const data = await getCredits(creditSummaryDate);
      if (data) setCredit(data);
    }
  };

  return role === "admin" || role === "super admin" ? (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        xs={12}
      >
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
                label="تاريخ الفحص"
                value={creditSummaryDate.creditSummaryDate}
                onChange={handleCreditSummaryDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={6}>
          <Button onClick={handleGetCredit}>حساب العمولة</Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        xs={12}
      >
        {/* SDG */}
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom align="center">
            حسابات يوم {today}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.cover} style={{ backgroundColor: "blue" }}>
              <AccountBalanceWalletIcon />
            </div>
            <CardHeader title="المعمل" />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {credit.lab || ""}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.cover} style={{ backgroundColor: "blue" }}>
              <AccountBalanceWalletIcon />
            </div>
            <CardHeader title="مازن" />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {credit.mazin || ""}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.cover} style={{ backgroundColor: "blue" }}>
              <AccountBalanceWalletIcon />
            </div>
            <CardHeader title="منعم" />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {credit.moniem || ""}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
}
