/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import Container from '@material-ui/core/Container';
import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  TextField, CssBaseline, Typography, Avatar,
  withStyles, Button, CircularProgress, Box,
} from '@material-ui/core';
import { VisibilityOff, LockOutlined } from '@material-ui/icons';
import { SnackBarContext } from '../../context/SnackBarProvider';
import Design from './style';
import schema from './LoginSchema';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      redirect: false,
      hasError: true,
      message: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

    renderRedirect = () => {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/trainee" />;
      }
    }

    handleChange = (key) => ({ target: { value } }) => {
      this.setState({ [key]: value });
    };

    onClickHandler = async (data, openSnackBar) => {
      const { loginUser } = this.props;
      const { email, password } = data;
      this.setState({
        loading: true,
        hasError: true,
      });
      const responseLogin = await loginUser({ variables: { email, password } });
      const response = JSON.parse(responseLogin.data.loginUser);
      this.setState({ loading: false });
      if (response.status === 200) {
        localStorage.setItem('token', response.data);
        this.setState({
          redirect: true,
          hasError: false,
          message: 'Successfully Login',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'success');
        });
      } else {
        this.setState({
          message: 'Login Failed, Record Not Found',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
    }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          schema.validateSyncAt(field, this.state);
          return false;
        } catch (err) {
          return err.message;
        }
      }
    };

    isTouched = (field) => {
      const { touched } = this.state;
      this.setState({
        touched: {
          ...touched,
          [field]: true,
        },
      });
    }

    render() {
      const { classes } = this.props;
      const {
        email, password, loading,
      } = this.state;
      this.hasErrors();
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box mx="auto" bgcolor="background.paper" p={2} className={classes.main} boxShadow={3}>
            <div className={classes.paper}>
              <Avatar className={classes.icon}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h4">Login</Typography>

              <form className={classes.form} noValidate>
                <TextField
                  required
                  fullWidth
                  id="outlined-full-width"
                  label="Email Address"
                  type="text"
                  margin="normal"
                  defaultValue=""
                  helperText={this.getError('email')}
                  error={!!this.getError('email')}
                  onChange={this.handleChange('email')}
                  onBlur={() => this.isTouched('email')}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon className={classes.input} />
                    ),
                  }}
                  variant="outlined"
                />
                <TextField
                  required
                  type="password"
                  fullWidth
                  id="outlined-full-width"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  helperText={this.getError('password')}
                  error={!!this.getError('password')}
                  onChange={this.handleChange('password')}
                  onBlur={() => this.isTouched('password')}
                  InputProps={{
                    startAdornment: (
                      <VisibilityOff className={classes.input} />
                    ),
                  }}
                />
                <SnackBarContext.Consumer>
                  {({ openSnackBar }) => (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={this.hasErrors()}
                      onClick={() => {
                        this.onClickHandler({ email, password }, openSnackBar);
                      }}
                    >
                      {loading && (
                        <CircularProgress />
                      )}
                      {loading && <span>Signing in</span>}
                      {!loading && <span>Sign in</span>}
                      {this.renderRedirect()}
                    </Button>
                  )}
                </SnackBarContext.Consumer>
              </form>
            </div>
          </Box>
        </Container>
      );
    }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(Design)(Login);
