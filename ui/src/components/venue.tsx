import { Component } from 'react';
import Seat from './seat';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: "#363A42"
  },
  container: {
    maxHeight: 680,
  },
  cell: {
    borderBottom: '#33363E'
  },
  stageCell: {
    backgroundColor: "#f07241",
    color: "#fff",
    borderBottom: 'none'
  },
  selectInfoCell: {
    color: "#070809",
    borderBottom: 'none'
  }
});

class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = { seatRows: [] }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.state.seatRows = []
  }

  componentDidMount() {
    this.state.seatRows = []
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    isChecked ? this.props.checkedItems.add(item) : this.props.checkedItems.delete(item);
  }

  seatRowSize() {
    return (this.state.seatRows.length > 0) ? this.state.seatRows[0].length : 0
  }

  setSeats() {
    for(let row=1; row <= this.props.row; row++){
      let rows = [];
      for(let col=1; col <= this.props.column; col++){
        rows.push(<Seat row={this.numberToLetter(row)} column={col} onChange={this.handleChange}/>)
      }
      this.state.seatRows.push(rows)
    }
  }

  numberToLetter(number) {
    return String.fromCharCode(64 + parseInt(number))
  }

  render() {
    const { classes } = this.props;
    this.setSeats();
    return (
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.stageCell} align="center" colSpan={this.seatRowSize()}>
                <Typography variant="h4" component="h2">Stage</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {
              this.state.seatRows.map(function(row, rowIdx) {
                return (<TableRow tabIndex={-1} key={rowIdx}>{row.map(function (seat, colIdx) {
                  return <TableCell align="center" className={classes.cell} key={colIdx}>{seat}</TableCell>
                })}</TableRow>)
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>)
  }
};

export default withStyles(styles)(Venue);
