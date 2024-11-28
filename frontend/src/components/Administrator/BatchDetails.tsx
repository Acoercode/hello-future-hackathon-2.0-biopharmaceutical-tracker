import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import TrackingPanel from "./TrackingPanel";
import DetailsPanel from "./DetailsPanel";
import BatchItemsList from "./BatchItemsList";
import DetailsMapPanel from "./DetailsMapPanel";
import ItemDetailsDialog from "./ItemDetailsDialog";

// mui
import Grid from "@mui/material/Grid2";

const BatchDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const batchDetails = useSelector((state: any) => state.admin.batchDetails);
  const batchItems = useSelector((state: any) => state.admin.batchItems);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState("");

  useEffect(() => {
    dispatch(adminActions?.getBatchDetails(id));
    dispatch(adminActions?.getBatchItems(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRowClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setOpenDialog(true);
  };

  return (
    <Grid container justifyContent={"center"} spacing={2} sx={{ mb: 2 }}>
      <Grid size={{ xs: 12, md: 3.5 }}>
        <TrackingPanel details={batchDetails} title={"Batch Tracking"} />
      </Grid>
      <Grid size={{ xs: 12, md: 8.5 }}>
        <Grid container justifyContent={"center"} spacing={2}>
          <Grid size={12}>
            <DetailsPanel details={batchDetails} title={"Batch Details"} />
          </Grid>
          <Grid size={12}>
            <BatchItemsList
              items={batchItems}
              setSelectedItemId={handleRowClick}
            />
          </Grid>
          <Grid size={12}>
            <DetailsMapPanel />
          </Grid>
        </Grid>
      </Grid>
      <ItemDetailsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        itemId={selectedItemId}
      />
    </Grid>
  );
};

export default BatchDetails;
