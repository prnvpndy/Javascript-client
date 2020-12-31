import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  TextField, CssBaseline, Card, Typography, Avatar,
  CardContent, withStyles, InputAdornment, Button,
} from '@material-ui/core';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import Design from './style';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

    handleChange = (key) => ({ target: { value } }) => {
      this.setState({ [key]: value });
    };

    hasErrors = () => {
      try {
        this.schema.validateSync(this.state);
      } catch (err) {
        return true;
      }
      return false;
    }

    // eslint-disable-next-line consistent-return
    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          this.schema.validateSyncAt(field, this.state);
          return '';
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
      return (
        <>
          <div className={classes.main}>
            <CssBaseline />
            <Card open aria-labelledby="form-dialog-title">
              <Avatar className={classes.icon}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h3" align="center">Login</Typography>
              <CardContent>
                <form>
                  <div>
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Email Address"
                      defaultValue=" "
                      variant="outlined"
                      helperText={this.getError('email')}
                      error={!!this.getError('email')}
                      onChange={this.handleChange('email')}
                      onBlur={() => this.isTouched('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      required
                      type="password"
                      fullWidth
                      id="outlined-required"
                      label="Password"
                      defaultValue=" "
                      variant="outlined"
                      helperText={this.getError('password')}
                      error={!!this.getError('password')}
                      onChange={this.handleChange('password')}
                      onBlur={() => this.isTouched('password')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityOff />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                &nbsp;
                  <div>
                    <Button variant="contained" color="primary" disabled={this.hasErrors()} fullWidth>SIGN IN</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(Design)(Login);
