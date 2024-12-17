import React from "react";

// components and helpers
import AppProvider from "./AppProviderWrapper";
import Navbar from "../components/Shared/Navbar";

// mui
import Box from "@mui/material/Box";
import { Alert, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";

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
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="warning"
              variant={"filled"}
              sx={{
                borderRadius: 0,
                bgcolor: "#FFDB58 !important",
                color: "#0b0b0b",
              }}
            >
              It looks like you haven't created any batches yet. Get started by
              clicking the 'Create New Batch' button below.
            </Alert>
          </Stack>
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
