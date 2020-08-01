import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
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
          <Typography variant="h5">Best Seat(s)</Typography>
            <Typography color="primary">{this.props.seats.map((item) => {
                return item.id;
              }).sort().join(" • ")}
            </Typography>
          </CardContent>
      </Card>
    )
  }
};

export default withStyles(styles)(BestAvailableSeatsResult);