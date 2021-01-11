/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { AddDialog } from './components/index';
import { TableComponent } from '../../components';
import trainees from './data/trainee';
import { useStyles } from './traineeStyle';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
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

  render() {
    const { open, order, orderBy } = this.state;
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
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
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
