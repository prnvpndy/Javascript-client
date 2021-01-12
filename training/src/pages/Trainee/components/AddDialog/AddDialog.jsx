/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './DialogSchema';
import Handler from './Handler';
import passwordStyle from './style';
import {
  hasErrors, passwordType,
} from './helper';

const constant = {
  Name: Person,
  // eslint-disable-next-line object-shorthand
  Email: Email,
  Password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      confirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
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
    const {
      open, onClose, onSubmit, classes,
    } = this.props;
    const { name, email, password } = this.state;
    const ans = [];
    Object.keys(constant).forEach((key) => {
      ans.push(<Handler
        label={key}
        onChange={this.handleChange(key)}
        onBlur={() => this.isTouched(key)}
        helperText={this.getError(key)}
        error={!!this.getError(key)}
        icons={constant[key]}
        type={passwordType(key)}
      />);
    });

    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <div>
              {ans[0]}
            </div>
              &nbsp;
            <div>
              {ans[1]}
            </div>
              &nbsp;
            <div className={classes.passfield}>
              <div className={classes.pass}>
                {ans[2]}
              </div>
                &nbsp;
                &nbsp;
              <div className={classes.pass}>
                {ans[3]}
              </div>
            </div>
          &nbsp;
            <div align="right">
              <Button onClick={onClose} color="primary">CANCEL</Button>
              <Button variant="contained" color="primary" disabled={hasErrors(this.state)} onClick={() => onSubmit()({ name, email, password })}>SUBMIT</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withStyles(passwordStyle)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
