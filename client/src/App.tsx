import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "views/login";
import Dashboard from "views/dashboard";
import PrivateRoute from "components/auth/privateRoute";
import store from "store";
import { loadUser } from "actions/authActions";
import { RootState } from "reducers";
import { clearMsg } from "actions/authActions";

// Material
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

function App() {
  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const { msg } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // On mount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // On auth message update
  useEffect(() => {
    if (msg !== "") {
      setSnackMsg(msg);
      toggleSnack();
      dispatch(clearMsg());
    }
  }, [msg]);

  const toggleSnack = () => {
    setSnack(!snack);
  };

  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={Login} />
        </Switch>
      </Router>
      <Snackbar open={snack} onClose={toggleSnack} autoHideDuration={6000}>
        <Alert severity="error" variant="filled" onClose={toggleSnack}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
