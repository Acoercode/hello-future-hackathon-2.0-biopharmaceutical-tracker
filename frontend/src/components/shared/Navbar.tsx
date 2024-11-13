import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import logo from "../../assets/images/acoer_logo.svg";
import { Link } from "react-router-dom";
import { Fab, Tooltip } from "@mui/material";
import InsightSideAiIcon from "../../assets/images/Black&YellowAIIcon.svg";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%", borderRadius: 0 }}>
        <Toolbar>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo on the left */}
            <img
              src={logo}
              alt="Logo"
              height={40}
              style={{ marginLeft: "16px" }}
            />

            {/* Fab button on the right */}
            <Tooltip title="Acoer AI Companion">
              <Link to="/ai-companion" style={{ textDecoration: "none" }}>
                <Fab
                  size="small"
                  color="inherit"
                  aria-label="AI Companion"
                  sx={{
                    backgroundColor: "#fff",
                    marginRight: "16px",
                  }}
                >
                  <img src={InsightSideAiIcon} alt="AI Icon" height="100%" />
                </Fab>
              </Link>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
