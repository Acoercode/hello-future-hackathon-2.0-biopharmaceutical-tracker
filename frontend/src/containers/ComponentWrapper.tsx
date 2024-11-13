import React from "react";

// components and helpers
import AppProvider from "./AppProviderWrapper";
import Navbar from "../components/administrator/Navbar";

// mui
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";

function ComponentWrapper<T>(
  WrappedComponent: React.ComponentType<T>,
): (props: T) => JSX.Element {
  return (props: T) => {
    return (
      <AppProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <CssBaseline />
          <Box component="header">
            <Navbar />
          </Box>
          <Box component="main" sx={{ flexGrow: 1, width: "100%", mt: 4 }}>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            <WrappedComponent {...props} />
          </Box>
        </Box>
      </AppProvider>
    );
  };
}

export default ComponentWrapper;
