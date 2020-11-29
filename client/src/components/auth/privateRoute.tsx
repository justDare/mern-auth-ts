import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

const PrivateRoute = ({ component, ...rest }: any) => {
  const { isAuthed } = useSelector((state: RootState) => state.auth);

  const routeComponent = (props: any) =>
    isAuthed ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
