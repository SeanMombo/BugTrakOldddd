import React from 'react';
import { Redirect, Route } from 'react-router-dom'



const LoginRerouter = ({ component: Component, currentUser, ...rest }) => {

  
    return (
      <Route
        {...rest}
        render={props =>
            currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
          )
        }
      />
    )
  }
  
  export default LoginRerouter