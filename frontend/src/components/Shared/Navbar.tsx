import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import logo from "../../assets/images/acoer_logo.svg";
import { Link } from "react-router-dom";
import { Fab, IconButton, Tooltip } from "@mui/material";
import InsightSideAiIcon from "../../assets/images/Black&YellowAIIcon.svg";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
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
        }}
      >
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
              height={pathname ? 20 : 40}
              style={{ marginLeft: "16px" }}
            />
            {pathname && (
              <Typography variant={"h6"} color={"white"}>
                Scan
              </Typography>
            )}
            {pathname ? (
              <IconButton size={"large"}>
                <FlashOnRoundedIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : (
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
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
