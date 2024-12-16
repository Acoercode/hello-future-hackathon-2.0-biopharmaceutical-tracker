import React from "react";

// components and helpers
import {
  trackingInfoBatchHelper,
  trackingInfoItemHelper,
  trackingPanelHelper,
  trackingStepIcon,
} from "./helpers/TrackingPanelHelper";
import utils from "../../utils/utils";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EventIcon from "@mui/icons-material/Event";

interface BatchTrackingPanelProps {
  details: any;
  title: string;
  type: string;
}

const TrackingPanel: React.FC<BatchTrackingPanelProps> = ({
  details,
  title,
  type,
}) => {
  const renderTrackingCard = () => {
    let orderedActivities = [];
    orderedActivities = [...(details.activities || [])].sort(
      // @ts-ignore
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    return orderedActivities.map((step: any, index: number) => {
      return (
        <Grid size={12} key={`tracking-${index}`}>
          <Paper
            sx={{
              p: 2,
              bgcolor: index > 0 ? "#252525 !important" : "#FFDB58 !important",
            }}
          >
            <Grid container alignItems={"center"}>
              <Grid size={2}>
                <EventIcon
                  sx={{ color: index === 0 ? "#0d0d0d" : "#FFDB58" }}
                />
              </Grid>
              <Grid size={10}>
                <Stack>
                  <Typography
                    sx={{
                      color: index === 0 ? "#0d0d0d" : "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {title.includes("Item") && step.status === "ADMINISTERED"
                      ? "Administered"
                      : trackingPanelHelper(step.status.toLowerCase())}
                  </Typography>
                  <Typography sx={{ color: index === 0 ? "#0d0d0d" : "#fff" }}>
                    {utils.formatDate(step.date)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={12}>
                {type === "batch" &&
                  trackingInfoBatchHelper(step.status.toLowerCase()).map(
                    (info, i) => {
                      return (
                        <Grid
                          container
                          alignItems={"center"}
                          spacing={2}
                          sx={{ pt: 2 }}
                        >
                          <Grid size={2}>{trackingStepIcon(info, index)}</Grid>
                          <Grid size={10}>
                            <Stack key={i}>
                              <Typography
                                sx={{
                                  color: index === 0 ? "#0d0d0d" : "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                {utils
                                  .toTitleText(info)
                                  .replace("Qc", "QC")
                                  .replace("Id", "ID")}
                              </Typography>
                              {info.toLowerCase() === "manufacturer" ? (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {details.brand}
                                </Typography>
                              ) : step.status.toLowerCase() ===
                                  "manufactured" && info === "location" ? (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {details.location}
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {step[info]}
                                </Typography>
                              )}
                            </Stack>
                          </Grid>
                        </Grid>
                      );
                    },
                  )}
                {type === "item" &&
                  trackingInfoItemHelper(step.status.toLowerCase()).map(
                    (info, i) => {
                      return (
                        <Grid
                          container
                          alignItems={"center"}
                          spacing={2}
                          sx={{ pt: 2 }}
                        >
                          <Grid size={2}>{trackingStepIcon(info, index)}</Grid>
                          <Grid size={10}>
                            <Stack key={i}>
                              <Typography
                                sx={{
                                  color: index === 0 ? "#0d0d0d" : "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                {utils
                                  .toTitleText(info)
                                  .replace("Qc", "QC")
                                  .replace("Id", "ID")}
                              </Typography>
                              {info.toLowerCase() === "manufacturer" ? (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {details.brand}
                                </Typography>
                              ) : step.status.toLowerCase() ===
                                  "manufactured" && info === "location" ? (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {details.location}
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    color: index === 0 ? "#0d0d0d" : "#fff",
                                  }}
                                >
                                  {step[info]}
                                </Typography>
                              )}
                            </Stack>
                          </Grid>
                        </Grid>
                      );
                    },
                  )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid size={"auto"}>
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              {title.includes("Batch") ? (
                <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                  # {details && details.productId}
                </Typography>
              ) : (
                <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                  # {details && details.batch && details.batch.productId} -{" "}
                  {details && details.itemNumber}
                </Typography>
              )}
            </Grid>
            <Grid size={"auto"}>
              <Chip
                label={details && details.status}
                color={"primary"}
                sx={{ fontWeight: "bold" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          {details && details.activities && details.activities.length > 0 ? (
            <Grid container spacing={2}>
              {renderTrackingCard()}
            </Grid>
          ) : (
            <Typography variant={"body1"} sx={{ textAlign: "center" }}>
              No tracking data available
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TrackingPanel;
