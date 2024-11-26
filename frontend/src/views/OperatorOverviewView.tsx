import React from "react";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";

// mui
import Grid from "@mui/material/Grid2";
import OperatorScan from "../components/Operator/OperatorScan";
import OperatorBottomSheet from "../components/Operator/OperatorBottomSheet";

const OperatorOverviewView: React.FC = () => {
  return (
    <Grid container justifyContent={"center"} spacing={4}>
      <Grid size={11}>
        <OperatorScan />
      </Grid>
      <Grid size={12}>
        <OperatorBottomSheet />
      </Grid>
    </Grid>
  );
};

export default ComponentWrapper(OperatorOverviewView);
