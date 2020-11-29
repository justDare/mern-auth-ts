import React from "react";
import Appbar from "./appbar";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import "./dashboard.scss";

// Material
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <Appbar user_name={user?.user_name} />
      <Container className="dash-container">
        <Typography variant="h4">User Info</Typography>
        <div className="row">
          <Typography variant="overline">Name</Typography>
          <Typography variant="body1">{user?.user_name}</Typography>
        </div>
        <div className="row">
          <Typography variant="overline">Email</Typography>
          <Typography variant="body1">{user?.email}</Typography>
        </div>
        <div className="row">
          <Typography variant="overline">Register Date</Typography>
          <Typography variant="body1">{user?.register_date}</Typography>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
