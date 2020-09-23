import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/FormatListNumbered";
import ContactIcon from "@material-ui/icons/PermContactCalendar";
import WorkIcon from "@material-ui/icons/Work";
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

export default function Review({ user }) {
  const classes = useStyles();

  let role;
  switch (user.role) {
    case "agency":
      role = "وكالة";
      break;
    case "lab":
      role = "موظف معمل";
      break;
    case "admin":
      role = "ادمن";
      break;
    case "user":
      role = "عميل";
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        مراجعة البيانات
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="اسم المستخدم"
            secondary={<Typography variant="h6">{user.userName}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <ListIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="الإسم"
            secondary={<Typography variant="h6">{user.name}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <ContactIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="الهاتف"
            secondary={<Typography variant="h6">{user.phoneNumber}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <ListIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="الإيميل"
            secondary={<Typography variant="h6">{user.email}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <ListIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="الصلاحية"
            secondary={<Typography variant="h6">{role}</Typography>}
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
