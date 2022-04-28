import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

const ProtectedRoute = ({
  allowed,
  redirectTo,
  component: Component,
  render,
  children,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (allowed) {
        if (Component) {
          return <Component {...props} />
        } else if (render) {
          return render(props)
        } else {
          return children
        }
      }

      return <Redirect to={redirectTo} />
    }}
  />
)

export const PrivateRoute = (props) => (
  <ProtectedRoute {...props} allowed={isLoggedIn()} redirectTo="/auth" />
)

export const PublicRoute = (props) => (
  <ProtectedRoute {...props} allowed={!isLoggedIn()} redirectTo="/" />
)
