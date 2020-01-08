import { Redirect, Route } from 'react-router-dom'
import { Component } from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

export default PrivateRoute
