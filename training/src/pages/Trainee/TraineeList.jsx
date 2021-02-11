/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { Mutation } from '@apollo/react-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { useStyles } from './traineeStyle';
import { GET_TRAINEE } from './Query';
import { SnackBarContext } from '../../context/index';
import { UPDATE_TRAINEE, CREATE_TRAINEE } from './Mutation';
import { UPDATED_TRAINEE_SUB, DELETED_TRAINEE_SUB, CREATE_SUB } from './Subscription';

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

  onSubmitAdd = async (data, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      refetch();
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
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

  handleSelect = (event) => {
    console.log(event);
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

  onSubmitEdit = async (data, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      refetch();
      this.setState({
        editOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  handlePageChange = (refetch) => (event, newPage) => {
    const { data: { variables } } = this.props;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ variables });
    });
  }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { Trainees } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...Trainees].map((records) => {
          if (records.originalId === traineeUpdated.originalId) {
            return {
              ...records,
              ...traineeUpdated,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount,
            Trainees: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { Trainees } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        const updatedRecords = [...Trainees].filter((records) => records.originalId !== traineeDeleted.data.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount - 1,
            Trainees: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: CREATE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { Trainees } } = prev;
        const { data: { traineeAdded } } = subscriptionData;

        Trainees.unshift(traineeAdded);
        const updatedRecords = [...Trainees].unshift((records) => records.originalId !== traineeAdded.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            totalCountOfData: parseInt(prev.getAllTrainees.TraineeCount) + 1,
            Trainees: updatedRecords,
          },
        };
      },
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
      },
    } = this.props;
    const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
    return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(createTrainee, createrLoader = { loading }) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(updateTrainee, updateLoader = { loading }) => (
                <SnackBarContext.Consumer>
                  {({ openSnackBar }) => (
                    <>
                      <div className={classes.root}>
                        <div className={classes.dialog}>
                          <Button variant="outlined" color="primary" onClick={() => this.handleClick(true)}>
                            ADD TRAINEELIST
                          </Button>
                          <AddDialog
                            open={open}
                            onClose={() => this.handleClick(false)}
                            onSubmit={
                              (data) => this.onSubmitAdd(
                                data, openSnackBar, createTrainee, refetch,
                              )
                            }
                            loading={createrLoader}
                          />
                        </div>
          &nbsp;
          &nbsp;
                        <EditDialog
                          editOpen={editOpen}
                          handleEditClose={this.handleEditClose}
                          handleEdit={
                            (data) => this.onSubmitEdit(
                              data, openSnackBar, updateTrainee, refetch,
                            )
                          }
                          data={editData}
                          loading={updateLoader}
                        />
                        <br />
                        <DeleteDialog
                          data={deleteData}
                          onClose={this.handleRemoveClose}
                          onSubmit={this.handleRemove}
                          open={removeOpen}
                          refetch={refetch}
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
                  )}
                </SnackBarContext.Consumer>
              )}
            </Mutation>
          )}
        </Mutation>
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
    options: { variables: { skip: 0, limit: 20 } },
  }),
)(traineeList);
