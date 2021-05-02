import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { MyContext } from '../../App';

const PrivateRouter = ({ children, ...rest }) => {
    const [loggedUser,setLoggedUser] = useContext(MyContext)
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRouter;
