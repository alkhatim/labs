import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getMyProfile,
  updateMyUserProfile,
  updateMyPassword,
} from "./../../redux/actions/users_actions";
import Typography from "@material-ui/core/Typography";
import messages from "../../helpers/messages";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import BusinessIcon from "@material-ui/icons/Business";
import PublicIcon from "@material-ui/icons/Public";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import { UpdatePasswordDialog, EditDialog } from "./Dialogs";

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

export default function UserProfile() {
  const classes = useStyles();

  const [user, setUser] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    password: "",
    email: "",
    photo: "",
    role: "",
  });

  const [edit, setEdit] = useState(false);
  const [del, setUpdatePassword] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await getMyProfile();
      if (result) setUser(result);
    };
    fetch();
  }, []);

  const handleEditOpen = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const handleUpdatePasswordOpen = () => {
    setUpdatePassword(true);
  };
  const handleUpdatePasswordClose = () => {
    setUpdatePassword(false);
  };

  const handleEditSubmit = async (user) => {
    const result = await updateMyUserProfile(user);
    if (result) {
      handleEditClose();
      messages.success("تم التعديل بنجاح");
    }
  };

  const handleUpdatePassword = async (passwords, e) => {
    e.preventDefault();
    const result = await updateMyPassword(passwords);
    if (result) {
      handleUpdatePasswordClose();
      messages.success("تم التعديل بنجاح");
    }
  };

  const editModal = () => {
    handleEditOpen();
  };

  const updatePasswordModal = () => {
    handleUpdatePasswordOpen();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        المستخدم
      </Typography>

      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
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
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="رقم الهاتف"
            secondary={<Typography variant="h6">{user.phoneNumber}</Typography>}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemAvatar>
            <Avatar>
              <PublicIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="البريد الاليكتروني"
            secondary={<Typography variant="h6">{user.email}</Typography>}
          />
        </ListItem>
      </List>
      <Button
        size="small"
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        onClick={editModal}
      >
        تعديل البيانات
      </Button>
      <Button
        style={{ margin: 20 }}
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<LockIcon />}
        onClick={updatePasswordModal}
      >
        تعديل كلمة المرور
      </Button>
      <EditDialog
        open={edit}
        handleClose={handleEditClose}
        onSubmit={handleEditSubmit}
        userData={user}
      />
      <UpdatePasswordDialog
        open={del}
        userData={user}
        handleClose={handleUpdatePasswordClose}
        onSubmit={handleUpdatePassword}
      />
    </React.Fragment>
  );
}
