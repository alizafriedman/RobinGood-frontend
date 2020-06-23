import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00897B",
    },
    secondary: {
      main: "#00897B",
    },
  },
    shadows: ["none"],
    typography: {
      fontFamily: '"Capsule Sans Display",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
    },
    button: {
        textDecoration: ["none"]
    }
});

export default theme;
