import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import { RTL } from "./helpers/RTL";
import Routes from "./routes";
import history from "./helpers/history";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-router-dom";
import { loadUserAction } from "./redux/actions/auth_actions";
import "./App.css";

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  typography: {
    fontFamily: `"Tajawal", sans-serif;`,
    fontSize: 16,
  },
});

function App() {
  store.dispatch(loadUserAction());

  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Router history={history}>
              <Routes />
            </Router>
          </div>
        </ThemeProvider>
      </RTL>
      <ToastContainer pauseOnFocusLoss={false} />
    </Provider>
  );
}

export default App;
