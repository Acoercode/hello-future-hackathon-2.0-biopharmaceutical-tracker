import React, { useState } from "react";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";
import OperatorScan from "../components/Operator/OperatorScan";
import OperatorBottomSheet from "../components/Operator/OperatorBottomSheet";

// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Stack from "@mui/material/Stack";

const OperatorOverviewView: React.FC = () => {
  const [data, setData] = useState("");

  const handleRestart = () => {
    setData("");
  };

  // const demoData = {
  //   id: "fe07070e-4abb-4402-9971-e7192a63b084",
  //   brand: "LA ROCHE",
  //   productId: "VC-024",
  //   productType: "VACCINE",
  //   expirationDate: "2025/08/06",
  //   numberOfItems: 10,
  // };
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
        <OperatorBottomSheet data={data && JSON.parse(data)} />
        {/*<OperatorBottomSheet data={demoData} />*/}
      </Grid>
    </Grid>
  );
};

export default ComponentWrapper(OperatorOverviewView);
