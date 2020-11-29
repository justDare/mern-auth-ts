import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { Redirect } from "react-router";
import { login } from "actions/authActions";
import Register from "./register";
import "./login.scss";

// Material
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

function Login() {
  const { isAuthed } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formInfo, setFormInfo] = useState({ email: "", password: "" });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(login(formInfo));
  };

  if (isAuthed) return <Redirect to={{ pathname: "/dashboard" }} />;

  return (
    <div className="login">
      <Container maxWidth="sm">
        <Paper elevation={20} className="paper">
          <AccountCircleIcon className="icon" />
          <form onSubmit={onSubmit}>
            <FormControl variant="outlined" fullWidth className="form-control">
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                name="email"
                required={true}
                type="email"
                onChange={onChange}
                className="mb-3"
                endAdornment={
                  <InputAdornment position="end">
                    <EmojiPeopleIcon></EmojiPeopleIcon>
                  </InputAdornment>
                }
                labelWidth={40}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                onChange={onChange}
                name="password"
                required={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="login-button"
            >
              Login
            </Button>
          </form>
          <Register />
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
