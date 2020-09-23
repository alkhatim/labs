import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function EditDialog(props) {
  const { handleClose, open, onSubmit, userData } = props;
  const [user, setUser] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    password: "",
    email: "",
    photo: "",
    role: "",
  });

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        disableBackdropClick={false}
        TransitionComponent={Transition}
        transitionDuration={700}
        maxWidth="sm"
        open={open}
      >
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            name="userName"
            value={user.userName}
            label="الاسم"
            type="text"
            onChange={handleChange}
            required
            inputProps={{
              style: { textAlign: "right" },
              dir: "rtl",
            }}
            autoFocus
          />
          <TextField
            margin="dense"
            name="email"
            value={user.email}
            label="البريد الالكتروني"
            type="email"
            fullWidth
            onChange={handleChange}
            required
            inputProps={{
              style: { textAlign: "right" },
              dir: "rtl",
            }}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            value={user.phoneNumber}
            label="رقم الهاتف"
            type="text"
            fullWidth
            onChange={handleChange}
            required
            inputProps={{
              style: { textAlign: "right" },
              dir: "rtl",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            رجوع
          </Button>
          <div style={{ flex: "1 0 0" }} />
          <Button
            onClick={() => onSubmit(user)}
            variant="contained"
            color="primary"
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export function UpdatePasswordDialog({ handleClose, open, onSubmit }) {
  let [passwords, setPasswords] = useState({
    newPassword: "",
    currentPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        disableBackdropClick={false}
        TransitionComponent={Transition}
        transitionDuration={700}
        maxWidth="sm"
        open={open}
      >
        <form onSubmit={(e) => onSubmit(passwords, e)}>
          <DialogContent>
            <TextField
              margin="dense"
              fullWidth
              name="currentPassword"
              value={passwords.currentPassword}
              label="كلمة المرور الحالية"
              type="password"
              onChange={handleChange}
              required
              inputProps={{
                style: { textAlign: "right" },
                dir: "rtl",
              }}
              autoFocus
            />
            <TextField
              margin="dense"
              name="newPassword"
              value={passwords.newPassword}
              label="كلمة المرور الجديدة"
              type="password"
              fullWidth
              onChange={handleChange}
              required
              inputProps={{
                style: { textAlign: "right" },
                dir: "rtl",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              رجوع
            </Button>
            <div style={{ flex: "1 0 0" }} />
            <Button type="submit" variant="contained" color="primary">
              حفظ
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
