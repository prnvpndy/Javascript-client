/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBarContext = React.createContext();

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CustomizedSnackbars = () => {
  const value = React.useContext(SnackBarContext);
  const { closeSnackBar, state } = value;
  const {
    open, message, status,
  } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackBar();
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {status === 'success' ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        )
          : <Alert onClose={handleClose} severity="error">{message}</Alert>}
      </Snackbar>
    </div>
  );
};
export { SnackBarContext, CustomizedSnackbars };
