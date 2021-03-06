import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { useSelector } from "react-redux";

import DirectionsIcon from "@material-ui/icons/Directions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import IconButton from "@material-ui/core/IconButton";
import {
  getApplicationsStats,
  getAllStats,
} from "../redux/actions/applications_actions";
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

export default function CenteredGrid() {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);
  const user = useSelector((store) => store.authReducer.user);

  const [applications, setApplications] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      if (role === "agency") {
        const result = await getApplicationsStats();
        if (result) setApplications(result);
      } else {
        const result = await getAllStats();
        if (result) setApplications(result);
      }
    };
  if(role && user)  fetch();
  }, [dispatch, role, user]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          align="center"
          alignItems="center"
          alignContent="center"
          xs={12}
        >
          <Typography variant="h2" gutterBottom>
            ?????????? ??????????
          </Typography>
        </Grid>
        <Grid xs={12} style={{ marginTop: "5px" }}>
          {StatusCard(
            "???? ??????????????",
            applications.registeredCount,
            "blue",
            <ErrorOutlineIcon />,
            role === "agency" ? "/my-applications" : "/all-applications"
          )}
        </Grid>
        <Grid xs={12} style={{ marginTop: "5px" }}>
          {StatusCard(
            "???? ??????????",
            applications.testedCount,
            "green",
            <ErrorOutlineIcon />,
            role === "agency" ? "/my-applications" : "/all-applications"
          )}
        </Grid>
        {role === "admin" ||
          role === "super admin" ||
          (role === "agency" &&
            (user.user.type === "agency" ||
              user.user.type === "recruitment office") && (
              <Grid xs={12} style={{ marginTop: "5px" }}>
                {StatusCard(
                  "???? ????????????",
                  applications.paidApplications,
                  "green",
                  <ErrorOutlineIcon />,
                  role === "agency"
                    ? "/my-applications/paid"
                    : "/all-applications/paid"
                )}
              </Grid>
            ))}
        {role === "admin" ||
          role === "super admin" ||
          (role === "agency" &&
            (user.user.type === "agency" ||
              user.user.type === "recruitment office") && (
              <Grid xs={12} style={{ marginTop: "5px" }}>
                {StatusCard(
                  "??????????????",
                  applications.notPaidApplications,
                  "green",
                  <ErrorOutlineIcon />,
                  role === "agency"
                    ? "/my-applications/not-paid"
                    : "/all-applications/not-paid"
                )}
              </Grid>
            ))}
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "55px" }}>
        <Grid xs={4} style={{ marginTop: "5px" }}>
          <Typography>?????????????????? ???? ???????? ????????????:</Typography>
        </Grid>
        <Grid xs={4} style={{ marginTop: "5px" }}>
          <Typography>249912158581+</Typography>
        </Grid>
        <Grid xs={4} style={{ marginTop: "5px" }}>
          <Typography>249912366134+</Typography>
        </Grid>
      </Grid>
    </div>
  );

  function StatusCard(title, number, color, icon, destination) {
    return (
      <Card className={classes.card}>
        <div className={classes.cover} style={{ backgroundColor: color }}>
          {icon}
        </div>
        <CardHeader title={title} subheader="" />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {number}
            </Typography>
            <IconButton aria-label="share">
              <Link to={destination}>
                <DirectionsIcon />
              </Link>
            </IconButton>
          </CardContent>
        </div>
      </Card>
    );
  }
}
