/* eslint-disable import/no-cycle */
import React from 'react';
import propTypes from 'prop-types';
import { snackBarContext, CustomizedSnackbars } from './CustomizedSnackbar';

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      status: '',
      open: false,
    };
  }

handleSnackBar = (message, status) => {
  this.setState({
    message,
    status,
    open: true,
  });
}

handleCloseSnackBar = (message) => {
  this.setState({
    message,
    open: false,
  });
}

render() {
  const { children } = this.props;
  const { message, status, open } = this.state;
  return (
    <>
      <snackBarContext.Provider
        value={{
          state: { message, status, open },
          openSnackBar: this.handleSnackBar,
          closeSnackBar: this.handleCloseSnackBar,
        }}
      >
        {children}
        <CustomizedSnackbars />
      </snackBarContext.Provider>
    </>
  );
}
}

SnackBarProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export { SnackBarProvider };
