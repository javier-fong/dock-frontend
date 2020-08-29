import React from "react";
import { Route} from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('login') ? children : window.location.href='/'
      }
    />
  );
};
export default ProtectedRoute;

// The protected route is the main component in creating protection for a page. 
// The rendering component will check whether the localstorage item already has the token item
// If yes, the route will continue on the destination page. 
// Otherwise, react will call the Redirect component to redirect to the login page
