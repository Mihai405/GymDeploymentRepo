import { styled } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#525252",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: ["Oswald", "sans-serif"].join(","),
  },
});

export const StyledButton = styled(Button)`
  border-radius: 50px;
  padding-inline: 25px;
  padding-block: 10px;
`;
