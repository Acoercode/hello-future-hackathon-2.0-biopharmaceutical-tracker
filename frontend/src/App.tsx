import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { getDesignTokens } from "./styles/theme";

// redux
import { defaultStore } from "./store/defaultStore";
import { Provider } from "react-redux";
import AdminBatchOverviewView from "./views/AdminBatchOverviewView";
import AdminBatchDetailView from "./views/AdminBatchDetailView";
import AdminCreateBatchView from "./views/AdminCreateBatchView";

function App() {
  const initialModeState: string | (() => string) = "light";
  const [mode] = React.useState<string>(initialModeState);
  const theme = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <BrowserRouter>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/" element={<AdminBatchOverviewView />} />
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
