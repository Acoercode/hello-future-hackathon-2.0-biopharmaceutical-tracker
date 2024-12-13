import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";
import OperatorScan from "../components/Operator/OperatorScan";
import OperatorBottomSheet from "../components/Operator/OperatorBottomSheet";
import { adminActions } from "../components/Administrator/AdminActions";

// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Stack from "@mui/material/Stack";
import { operatorActions } from "../components/Operator/OperatorActions";

const OperatorOverviewView: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (data && data.id && data.itemNumber) {
      const batchId = data.batchId;
      const itemId = data.id;
      dispatch(adminActions?.getItemDetails(batchId, itemId));
      setType("item");
    } else if (data && data.id) {
      const id = data.id;
      dispatch(adminActions?.getBatchDetails(id));
      setType("batch");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleRestart = () => {
    setData(null);
    dispatch(operatorActions?.clearRecordedActivity());
  };

  const handleSubmit = (activityData: any) => {
    if (type === "batch") {
      dispatch(operatorActions?.recordActivity("batch", data.id, activityData));
    } else {
      dispatch(
        operatorActions?.recordActivity(
          "item",
          data.batchId,
          activityData,
          data.id,
        ),
      );
    }
  };

  return (
    <Grid container justifyContent={"center"} spacing={4}>
      {!data ? (
        <Grid size={11}>
          <OperatorScan setData={setData} />
        </Grid>
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <CameraAltOutlinedIcon sx={{ fontSize: 60 }} />
          <Button variant={"outlined"} onClick={handleRestart}>
            Scan New QR Code
          </Button>
        </Stack>
      )}
      <Grid size={12}>
        <OperatorBottomSheet
          data={data}
          handleSubmit={handleSubmit}
          type={type}
        />
      </Grid>
    </Grid>
  );
};

export default ComponentWrapper(OperatorOverviewView);
