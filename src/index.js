import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants';
import getLibrary from './utils/getLibrary.js';
import App from "./App";
import { StoreContextProvider } from "./context/store";
import { ApplicationContextProvider } from "./context/applicationContext";
import "./index.css";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00b0f0",
    },
    secondary: {
      main: "#232227",
    },
    text: { main: "#FFFFFF" },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontSize: 14,
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          height: 0,
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ApplicationContextProvider>
            <StoreContextProvider>
                <ThemeProvider theme={theme}>
                  <Router>
                    <App />
                  </Router>
                </ThemeProvider>
            </StoreContextProvider>
          </ApplicationContextProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
