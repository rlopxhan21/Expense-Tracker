import { createTheme } from "@mui/material";

export const useTheme = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#fff",
      },
      success: {
        main: "#2b8a3e",
      },
      error: {
        main: "#c92a2a",
      },
      background: {
        paper: "#eebefa",
      },
      text: {
        secondary: "#2b8a3e",
      },
    },
  });

  return { theme };
};
