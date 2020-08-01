import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

class BestAvailableSeat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<Card variant='outlined'>
      <CardContent color="background">
        <Typography color="primary">{this.getId()}</Typography>
      </CardContent>
    </Card>
    )
  }
  getId() {
    return `${this.props.row}${this.props.column}`
  }
};

export default BestAvailableSeat;
