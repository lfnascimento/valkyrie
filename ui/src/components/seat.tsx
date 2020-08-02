import { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import PropTypes from 'prop-types';

class Seat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormControlLabel
        color="secondary"
        label={ `${this.getId()}` }
        labelPlacement="start"
        control={<Checkbox
          icon={<EventSeatOutlinedIcon fontSize="large" />}
          color='primary'
          checkedIcon={<EventSeatIcon fontSize="large" />}
          name={`seats[${this.getId()}]`} />}
          onChange={this.props.onChange}
      />
    )
  }

  getId() {
    return `${this.props.row}${this.props.column}`
  }
};

export default Seat;

Seat.propTypes = {
  row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};