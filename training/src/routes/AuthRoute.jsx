/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (!(localStorage.getItem('token'))) {
        return (
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        );
      }
      return (
        <Route>
          <Redirect to="/trainee" />
        </Route>
      );
    }}
  />
);
AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default AuthRoute;
