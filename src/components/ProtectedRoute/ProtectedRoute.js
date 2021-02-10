import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({ component: Component, path, ...props }) {
  return(
    <Route path={path}>
      {
        () => {
          if (props.loggedIn === true) {
            return <Component {...props} />
          } else if (props.loggedIn === false) {
            return <Redirect to={{ pathname: "/", state: {noAuthRedirected: true} }} />
          }
        }
      }
    </Route>
  );
};

export default ProtectedRoute;
