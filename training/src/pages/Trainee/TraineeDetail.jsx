import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import {
  withStyles, Card, CardContent, Typography, CardMedia, Button,
} from '@material-ui/core';
import trainees from './data/trainee';
import NotFound from '../NoMatch';
import { style } from './traineeStyle';

function TraineeDetails(props) {
  const { classes } = props;
  const { match } = props;
  const traineeData = trainees.find(({ id }) => id === match.params.traineeId);
  const getDateFormatted = () => moment(traineeData.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
  if (traineeData === undefined) {
    return (
      <Route component={NotFound} />
    );
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <div className={classes.text}>Thumbnail</div>
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {traineeData.name}
            </Typography>
            <Typography component="subtitle1" color="textSecondary">
              {getDateFormatted()}
            </Typography>
            <Typography component="h6" variant="h6">
              {traineeData.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Button color="inherit" className={classes.back} component={Link} to="/trainee">
        Back
      </Button>
    </>
  );
}
TraineeDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(style)(TraineeDetails);
