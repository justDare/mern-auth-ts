import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "actions/authActions";
import { RootState } from "reducers";

// Material
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Appbar: React.FC<Props> = ({ open, handleClose }) => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    user_name: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { msg } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (msg === "Register failed.") setLoading(false);
  }, [msg]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(register(formInfo));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="register-form"
    >
      {loading ? <LinearProgress /> : ""}
      <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out the following form to register for an account!
        </DialogContentText>
        <form onSubmit={handleRegister}>
          <TextField
            onChange={onChange}
            value={formInfo.email}
            autoFocus
            margin="dense"
            label="Email Address"
            name="email"
            type="email"
            required={true}
            fullWidth
          />
          <TextField
            onChange={onChange}
            value={formInfo.user_name}
            margin="dense"
            label="User Name"
            name="user_name"
            required={true}
            fullWidth
          />
          <TextField
            onChange={onChange}
            value={formInfo.password}
            margin="dense"
            label="Password"
            name="password"
            type="password"
            required={true}
            fullWidth
          />
          <TextField
            onChange={onChange}
            value={formInfo.confirm_password}
            margin="dense"
            label="Confirm Password"
            name="confirm_password"
            type="password"
            required={true}
            fullWidth
          />
          <div className="actions">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Appbar;
