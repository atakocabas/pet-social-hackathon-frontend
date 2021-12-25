import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#be612a",
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;