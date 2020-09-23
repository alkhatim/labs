import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;
  const { isLoggedIn, isLoading } = useSelector((store) => store.authReducer);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading && !isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
