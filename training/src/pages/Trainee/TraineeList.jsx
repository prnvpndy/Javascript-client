/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

render() {
  const { open } = this.state;
  const { match: { url }, classes } = this.props;
  return (
    <>
      <div className={classes.root}>
        <div className={classes.dialog}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEELIST
          </Button>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
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
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
              },
            ]
          }
        />
        <ul>
          {trainees.map(({ name, id }) => (
            <li key={id}>
              <Link to={`${url}/${id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
