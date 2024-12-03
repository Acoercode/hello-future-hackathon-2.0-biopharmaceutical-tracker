import React from "react";

// Material UI
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material";

// Utils
import trustLoading from "../../assets/images/trustLoading.svg";
import trustLoadingDark from "../../assets/images/trustLoadingDark.svg";
import trustSuccess from "../../assets/images/trustSuccess.svg";
import trustSuccessDark from "../../assets/images/trustSuccessDark.svg";
import trustError from "../../assets/images/trustError.svg";
import trustErrorDark from "../../assets/images/trustErrorDark.svg";
import trustCheck from "../../assets/images/trustCheck.svg";
import trustCheckDark from "../../assets/images/trustCheckDark.svg";
import trustErrorImage from "../../assets/images/trustErrorImage.svg";
import trustErrorImageDark from "../../assets/images/trustErrorImageDark.svg";

interface TrustnessProps {
  score: number;
  verified: boolean;
  checking: boolean;
  type: string;
  disabled: boolean;
}

const Trustness: React.FC<TrustnessProps> = ({
  score,
  verified,
  checking,
  type,
  disabled,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const successTooltip = () => {
    return (
      <Grid container alignItems={"center"}>
        <Grid size={12}>
          <Grid container alignItems={"center"}>
            <Grid size={1}>
              <img
                src={
                  theme.palette.mode === "light" ? trustCheck : trustCheckDark
                }
                alt=""
              />
            </Grid>
            <Grid size={"auto"}>
              <Typography variant={"body2"}>
                Cryptographic Signature Validated
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container alignItems={"center"}>
            <Grid size={1}>
              <img
                src={
                  theme.palette.mode === "light" ? trustCheck : trustCheckDark
                }
                alt=""
              />
            </Grid>
            <Grid size={"auto"}>
              <Typography variant={"body2"}>
                Network Validation Verified
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container alignItems={"center"}>
            <Grid size={1}>
              <img
                src={
                  theme.palette.mode === "light" ? trustCheck : trustCheckDark
                }
                alt=""
              />
            </Grid>
            <Grid size={"auto"}>
              <Typography variant={"body2"}>
                Proof of Authenticity Passed
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const errorTooltip = () => {
    return (
      <Grid container justifyContent={"center"}>
        <Grid size={"auto"}>
          <img
            src={
              theme.palette.mode === "light"
                ? trustErrorImage
                : trustErrorImageDark
            }
            alt=""
          />
        </Grid>
        <Grid size={12}>
          <Typography sx={{ textAlign: "center" }} variant={"body2"}>
            The system was not able to verify this content at this time. Please
            come back later when the proof of authenticity will be recorded.
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{ position: "relative" }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {checking ? (
          <img
            src={
              theme.palette.mode === "light" ? trustLoading : trustLoadingDark
            }
            alt="Trust Loading"
            height={30}
          />
        ) : verified ? (
          <img
            src={
              theme.palette.mode === "light" ? trustSuccess : trustSuccessDark
            }
            alt="Trust Success"
            height={30}
          />
        ) : verified === undefined ? (
          <img
            src={
              theme.palette.mode === "light" ? trustLoading : trustLoadingDark
            }
            alt="Trust Loading"
            height={30}
          />
        ) : (
          <img
            src={theme.palette.mode === "light" ? trustError : trustErrorDark}
            alt="Trust Error"
            height={30}
          />
        )}
        {checking && (
          <CircularProgress
            size={40}
            thickness={1}
            sx={{
              color: theme.palette.mode === "light" ? "#414CAE" : "#7CCBBD",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: {
            borderRadius: 25,
            border: "solid #C8C8CC",
            padding: 10,
            maxWidth: 322,
          },
        }}
      >
        {!checking && verified && successTooltip()}
        {!checking && !verified && errorTooltip()}
      </Popover>
    </Box>
  );
};

export default Trustness;
