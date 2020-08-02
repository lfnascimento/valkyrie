import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import GradeIcon from '@material-ui/icons/Grade';

const styles = (theme : Theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "#272C34",
  }
});

class BestAvailableSeatsResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.root}>
        <CardHeader titleTypographyProps={{variant: "h5", color: 'textSecondary'}}
                    title="Best Seat(s)"
                    avatar={<GradeIcon color='primary' />}
                    />
        <CardContent>
          {
            this.props.seats.filter(e => e).length > 0 ? <Typography variant="h6" color="primary">{
                this.props.seats.filter(e => e).map((item) => {
                return item.id;
                }).sort().join(" • ")}
              </Typography> : <Typography color="textSecondary">None</Typography>
          }
        </CardContent>
      </Card>
    )
  }
};

export default withStyles(styles)(BestAvailableSeatsResult);

BestAvailableSeatsResult.propTypes = {
  seats: PropTypes.array.isRequired
};