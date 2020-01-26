import { Redirect, Route } from "react-router-dom";
import React from "react";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Component {...props} />
        // <Redirect to='/dashboard' />
      )
    }
  />
);

export default PublicRoute;
