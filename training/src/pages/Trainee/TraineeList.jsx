/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { useStyles } from './traineeStyle';
import callApi from '../../libs/utils/api';

class traineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      editOpen: false,
      removeOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 10,
      loading: false,
      Count: 0,
      dataObj: [],
    };
  }

  handleClick = (open) => {
    this.setState({ open });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

handleSubmit = (data) => {
  this.setState({
    open: false,
  }, () => {
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
      removeOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      removeOpen: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      removeOpen: false,
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
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    const value = this.context;
    callApi({ }, 'get', `/trainee?skip=${0}&limit=${20}`).then((response) => {
      if (response.Trainees === undefined) {
        this.setState({
          loading: false,
        }, () => {
        });
      } else {
        const { Trainees } = response;
        this.setState({ dataObj: Trainees, loading: false, Count: 100 });
        return response;
      }
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, editOpen, removeOpen, editData, deleteData, loading,
      dataObj, Count,
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
            data={deleteData}
            onClose={this.handleRemoveClose}
            onSubmit={this.handleRemove}
            open={removeOpen}
          />
          <br />
          <br />
          <TableComponent
            loader={loading}
            id="id"
            data={dataObj}
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
            onSelect={this.handleSelect}
            count={Count}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
