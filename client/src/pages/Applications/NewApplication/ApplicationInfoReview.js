import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import FlightIcon from "@material-ui/icons/Flight";
import TodayIcon from "@material-ui/icons/Today";
import PhoneIcon from "@material-ui/icons/Phone";
import React from "react";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ application }) {
  const classes = useStyles();

  const name =
    application.name1 +
    " " +
    application.name2 +
    " " +
    application.name3 +
    " " +
    application.name4;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        مراجعة البيانات
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="الاسم رباعي"
            secondary={<Typography variant="h6">{name}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <FlightIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="رقم الجواز"
            secondary={
              <Typography variant="h6">{application.passportNumber}</Typography>
            }
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="رقم الهاتف"
            secondary={
              <Typography variant="h6">{application.phoneNumber}</Typography>
            }
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <TodayIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="تاريخ السفر"
            secondary={
              <Typography variant="h6">
                {application.flightDate.toLocaleDateString()}
              </Typography>
            }
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <TodayIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="تاريخ الفحص"
            secondary={
              <Typography variant="h6">
                {application.testDate.toLocaleDateString()}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
