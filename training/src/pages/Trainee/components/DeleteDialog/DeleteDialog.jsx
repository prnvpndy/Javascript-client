/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { SnackBarContext } from '../../../../context/index';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

handleChange = (prop) => (event) => {
  this.setState({ [prop]: event.target.value }, () => console.log(this.state));
};

handleClose = () => {
  this.setState({ open: false });
};

onClickHandler = async (Data, openSnackBar) => {
  this.setState({
    loading: true,
  });
  const { onSubmit } = this.props;
  const { deleteTrainee, refetch } = this.props;
  const { originalId: id } = Data;
  const response = await deleteTrainee({ variables: { id } });
  this.setState({ loading: false });
  if (response.data.deleteTrainee !== 'undefined') {
    refetch();
    this.setState({
      message: 'Deleted Successfully ',
    }, () => {
      const { message } = this.state;
      onSubmit(Data);
      openSnackBar(message, 'success');
    });
  } else {
    this.setState({
      message: 'Error While Deleting',
    }, () => {
      const { message } = this.state;
      openSnackBar(message, 'error');
    });
  }
}

render() {
  const {
    open, onClose, onSubmit, data,
  } = this.props;
  const { loading } = this.state;

  return (
    <Dialog
      open={open}
      onClose={() => this.handleClose()}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
      <DialogContentText style={{ marginLeft: 25 }}>
        Do you really want to remove the trainee?
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <SnackBarContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit({ data });
                  this.onClickHandler(data, openSnackBar);
                }}
              >
                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Deleting</span>}
                {!loading && <span>Delete</span>}
              </Button>
            )}
          </SnackBarContext.Consumer>
        </DialogActions>
      </DialogContentText>
    </Dialog>
  );
}
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default DeleteDialog;
