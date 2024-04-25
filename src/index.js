import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./authentication";
import { ThemeProvider, createTheme } from "@mui/material";
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00000",
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
