import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  InputAdornment,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import { MyContext } from '../../../../context';
import useStyles from './style';
import schema from './EditDialogSchema';

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      error: {
        name: '',
        email: '',
      },
    };
  }

  handleSet = () => {
    const { data } = this.props;
    this.setState({
      name: data.name,
      email: data.email,
    });
  };

  handleOnChange = (prop) => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    const { error } = this.state;
    schema
      .validateAt(field, this.state)
      .then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      })
      .catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    return error[field];
  };

  hasErrors = () => {
    const { error } = this.state;
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== '');
    return !!iserror.length;
  };

  render() {
    const {
      Editopen, handleEditClose, handleEdit, data, classes,
    } = this.props;
    const { name, email, error } = this.state;
    return (
      <div>
        <Dialog
          open={Editopen}
          onClose={handleEditClose}
          onMouseEnter={this.handleSet}
          variant="outlined"
          color="primary"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit your trainee details</DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  error={!!error.name}
                  id="name"
                  type="text"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.name}
                  helperText={this.getError('name')}
                  onChange={this.handleOnChange('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <br />
              <br />
              <Grid item xs={12}>
                <TextField
                  error={!!error.email}
                  id="email"
                  type="email"
                  variant="outlined"
                  style={{ width: '100%' }}
                  margin="dense"
                  defaultValue={data.email}
                  helperText={this.getError('email')}
                  onChange={this.handleOnChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  onClick={() => {
                    handleEdit(name, email);
                    openSnackBar('This is a successfully updated message ! ', 'success');
                  }}
                  className={
                    (name === data.name && email === data.email) || this.hasErrors()
                      ? classes.button_error
                      : classes.button_color
                  }
                  color="primary"
                  disabled={
                    !!((name === data.name && email === data.email) || this.hasErrors())
                  }
                >
                  Submit
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
EditDialog.propTypes = {
  Editopen: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
