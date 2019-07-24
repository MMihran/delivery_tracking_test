import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6b9ff3",
      main: "#4688F1",
      dark: "#315fa8",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ed3374",
      main: "#E90052",
      dark: "#a30039",
      contrastText: "#fff"
    },
    text: {
      secondary: "#9c9c9c"
    },
    error: {
      main: "#D50000",
      light: "#DB2626"
    }
  }
});

export default theme;
