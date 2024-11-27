import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { getDesignTokens } from "./styles/theme";
import { isMobile } from "react-device-detect";

// redux
import { defaultStore } from "./store/defaultStore";
import { Provider } from "react-redux";
import AdminBatchOverviewView from "./views/AdminBatchOverviewView";
import AdminBatchDetailView from "./views/AdminBatchDetailView";
import AdminCreateBatchView from "./views/AdminCreateBatchView";
import type {} from "redux-thunk/extend-redux";
import OperatorOverviewView from "./views/OperatorOverviewView";

function App() {
  const initialModeState: string | (() => string) = "light";
  const [mode] = React.useState<string>(initialModeState);
  const theme = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => createTheme(getDesignTokens(mode)),
    [mode],
  );

  const url = window.location.pathname;
  useEffect(() => {
    if (url === "/") {
      isMobile
        ? (window.location.href = "/operator")
        : (window.location.href = "/admin");
    }
  }, [url]);
  return (
    <BrowserRouter>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/admin" element={<AdminBatchOverviewView />} />
            <Route exact path="/operator" element={<OperatorOverviewView />} />
            <Route
              exact
              path="/admin/create"
              element={<AdminCreateBatchView />}
            />
            <Route
              exact
              path="/admin/batch/:id"
              element={<AdminBatchDetailView />}
            />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
