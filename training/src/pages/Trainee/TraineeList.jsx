/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components/index';
import trainees from './data/trainee';
import { useStyles } from './traineeStyle';

class traineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      editOpen: false,
      removeOne: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 10,
    };
  }

handleClick = (open) => {
  this.setState({ open });
}

handleSubmit = (data) => {
  this.setState({
    open: false,
  }, () => {
    console.log(data);
  });
}

  handleSort = (field) => (event) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      removeOne: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      removeOne: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      removeOne: false,
    });
  };

  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      editOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      editOpen: false,
    });
  };

  handleEdit = (name, email) => {
    this.setState({
      editOpen: false,
    });
    console.log('Edited Item ', { name, email });
  };

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, editOpen, removeOne, editData,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.dialog}>
            <Button variant="outlined" color="primary" onClick={() => this.handleClick(true)}>
              ADD TRAINEELIST
            </Button>
            <AddDialog
              open={open}
              onClose={() => this.handleClick(false)}
              onSubmit={() => this.handleSubmit}
            />
          </div>
          &nbsp;
          &nbsp;
          <EditDialog
            editOpen={editOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
          />
          <br />
          <DeleteDialog
            openRemove={removeOne}
            onClose={this.handleRemoveClose}
            remove={this.handleRemove}
          />
          <br />
          <br />
          <TableComponent
            id="id"
            data={trainees}
            column={
              [
                {
                  field: 'name',
                  label: 'Name',
                },
                {
                  field: 'email',
                  label: 'Email Address',
                  format: (value) => value && value.toUpperCase(),
                },
                {
                  field: 'createdAt',
                  label: 'Date',
                  align: 'right',
                  format: this.getDateFormat,
                },
              ]
            }
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,

              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemoveDialogOpen,
              },
            ]}
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            count={100}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </>
    );
  }
}
traineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(traineeList);
