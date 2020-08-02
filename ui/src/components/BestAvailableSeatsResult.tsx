import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme : Theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "#363A42",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class BestAvailableSeatsResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.root}>
        <CardContent>
        <Typography>Best Available Seat(s)</Typography>
            <Typography variant="h6" color="primary">{
              this.props.seats.filter(e => e).map((item) => {
                return item.id;
              }).sort().join(" • ")}
            </Typography>
          </CardContent>
      </Card>
    )
  }
};

export default withStyles(styles)(BestAvailableSeatsResult);

BestAvailableSeatsResult.propTypes = {
  seats: PropTypes.array.isRequired
};