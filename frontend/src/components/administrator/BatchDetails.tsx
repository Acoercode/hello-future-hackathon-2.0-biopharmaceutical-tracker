import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// components and helpers

// mui
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "./AdminActions";
import TrackingPanel from "./TrackingPanel";
import DetailsPanel from "./DetailsPanel";
import BatchItemsList from "./BatchItemsList";
import DetailsMapPanel from "./DetailsMapPanel";

const BatchDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const batchDetails = useSelector((state: any) => state.admin.batchDetails);
  const batchItems = useSelector((state: any) => state.admin.batchItems);
  // const batchActivity = useSelector((state: any) => state.admin.batchActivity);

  useEffect(() => {
    dispatch(adminActions?.getBatchDetails(id));
    dispatch(adminActions?.getBatchItems(id));
    // dispatch(adminActions?.getBatchActivity(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // console.log("batchDetails", batchDetails);
  // console.log("batchItems", batchItems);
  // console.log("batchActivity", batchActivity);

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid size={3.5}>
        <TrackingPanel details={batchDetails} title={"Batch Tracking"} />
      </Grid>
      <Grid size={8.5}>
        <Grid container justifyContent={"center"} spacing={2}>
          <Grid size={12}>
            <DetailsPanel details={batchDetails} title={"Batch Details"} />
          </Grid>
          <Grid size={12}>
            <BatchItemsList items={batchItems} />
          </Grid>
          <Grid size={12}>
            <DetailsMapPanel />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BatchDetails;
