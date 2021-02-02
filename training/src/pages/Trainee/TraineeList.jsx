/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { useStyles } from './traineeStyle';
import { GET_TRAINEE } from './Query';

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
      rowsPerPage: 5,
      loading: false,
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

  handlePageChange = (refetch) => (event, newPage) => {
    const { data: { variables } } = this.props;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ variables });
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, editOpen, removeOpen, editData, deleteData, loading,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { Trainees = [], count = 0 } = {},
        refetch,
        // loading,
      },
    } = this.props;
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
              refetch={refetch}
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
            data={Trainees}
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
            count={count}
            page={page}
            onChangePage={this.handlePageChange(refetch)}
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
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 2 } },
  }),
)(traineeList);
