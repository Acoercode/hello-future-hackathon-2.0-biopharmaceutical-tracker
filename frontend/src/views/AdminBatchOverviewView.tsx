import React from "react";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";

// mui
import Grid from "@mui/material/Grid2";
import BatchOverview from "../components/Administrator/BatchOverview";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AdminBatchOverviewView: React.FC = () => {
  return (
    <Grid container justifyContent={"center"} spacing={4}>
      <Grid size={11}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={"h6"}>Welcome to your dashboard!</Typography>
          <Typography variant={"h6"}>
            <b>Acme Industries</b> - Atlanta GA
          </Typography>
        </Stack>
      </Grid>
      <Grid size={11}>
        <BatchOverview />
      </Grid>
    </Grid>
  );
};

export default ComponentWrapper(AdminBatchOverviewView);
