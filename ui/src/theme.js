import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F07241',
    },
    secondary: {
      main: '#E0E0E0'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#363A42',
    },
  },
});

export default theme;
