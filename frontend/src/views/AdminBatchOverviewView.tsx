import React from "react";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";

// mui
import Grid from "@mui/material/Grid2";
import BatchOverview from "../components/administrator/BatchOverview";

const AdminBatchOverviewView: React.FC = () => {
  return (
    <Grid container justifyContent={"center"}>
      <BatchOverview />
    </Grid>
  );
};

export default ComponentWrapper(AdminBatchOverviewView);
