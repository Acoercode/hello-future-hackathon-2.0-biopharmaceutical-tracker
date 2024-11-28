import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import logo from "../../assets/images/BioPharmaTrackerLogo_Desktop.png";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  const pathname = window.location.pathname.includes("/operator");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          borderRadius: 0,
          bgcolor: pathname ? "#2D2D2D !important" : null,
          height: 70,
        }}
      >
        <Toolbar sx={{ height: "100%", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={logo} alt="Logo" height={pathname ? 40 : 60} />
          </Box>
          {pathname && (
            <Typography
              variant="h6"
              color="white"
              sx={{
                position: "absolute",
                right: 20,
                fontWeight: "bold",
                // left: "50%",
                // transform: "translateX(-50%)",
              }}
            >
              Status Update
            </Typography>
          )}
          <Box />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
