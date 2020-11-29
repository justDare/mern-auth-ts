import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "actions/authActions";

// Material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface Props {
  user_name: string | undefined;
}

const Appbar: React.FC<Props> = ({ user_name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        <Typography variant="h6" className="user">
          Hey {user_name}!
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
