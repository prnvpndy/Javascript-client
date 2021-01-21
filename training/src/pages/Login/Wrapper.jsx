import React from 'react';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutation';
import Login from './Login';

// const updateCache = (Cache, { data: { loginUser } }) => {
// Cache.writeData({ data: { token: loginUser } });
// localStorage.setItem('token', loginUser);
// };

export default () => (
  <Mutation mutation={LOGIN_USER}>
    {(loginUser) => (
      <>
        <Login loginUser={loginUser} />
      </>
    )}
  </Mutation>
);
