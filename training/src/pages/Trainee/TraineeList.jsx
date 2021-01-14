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

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
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

  handleSelect = (event) => {
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.componentDidMount(newPage);
    this.setState({
      page: newPage,
    });
  };

  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('Deleted Item ', deleteData);
  };

  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (name, email) => {
    this.setState({
      EditOpen: false,
    });
    console.log('Edited Item ', { name, email });
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    const value = this.context;
    console.log('val :', value);
    callApi({ }, 'get', `/trainee?skip=${0}&limit=${20}`).then((response) => {
      console.log('res inside traineelist :', response.Trainees);
      if (response.Trainees === undefined) {
        this.setState({
          loading: false,
        }, () => {
        });
      } else {
        const { Trainees } = response;
        console.log('trainees', Trainees);
        this.setState({ dataObj: Trainees, loading: false, Count: 100 });
        return response;
      }
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, editData, deleteData, loading,
      dataObj, Count,
    } = this.state;
    const { classes } = this.props;
    console.log('records aa :', dataObj);
    console.log('state:', this.state);
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
              onSubmit={() => this.handleSubmit(false)}
            />
          </div>
          &nbsp;
          &nbsp;
          <EditDialog
            Editopen={EditOpen}
            handleEditClose={this.handleEditClose}
            handleEdit={this.handleEdit}
            data={editData}
          />
          <br />
          <DeleteDialog
            data={deleteData}
            onClose={this.handleRemoveClose}
            onSubmit={this.handleRemove}
            open={RemoveOpen}
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
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
