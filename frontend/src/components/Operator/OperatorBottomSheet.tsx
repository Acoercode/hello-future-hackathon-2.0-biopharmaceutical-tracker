import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";

// components and helpers
import scanImage from "../../assets/images/scan_qr.svg";
// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";

interface OperatorBottomSheetProps {
  data: any;
}

const OperatorBottomSheet: React.FC<OperatorBottomSheetProps> = ({ data }) => {
  const ref = useRef<SheetRef>();
  const [isOpen] = useState(true);
  const snapPoints = [-70, 0.45, 0.2];
  const initialSnap = 1;
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const close = () => snapTo(1);

  useEffect(() => {
    if (data) {
      snapTo(0);
    } else {
      snapTo(1);
    }
  }, [data]);

  // console.log("DATA", data);
  const renderHeader = (
    <Grid
      container
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Grid size={"auto"}>
        <Typography variant={"h6"}>Current Status</Typography>
        <Typography variant={"body1"}>#{data.productId}</Typography>
      </Grid>
      <Grid size={"auto"}>
        <Chip
          label={data && data.status ? data.status : "PENDING"}
          color={"primary"}
          sx={{ fontWeight: "bold" }}
        />
      </Grid>
      <Grid size={12}>
        <Divider color={"gray"} />
      </Grid>
    </Grid>
  );

  const renderUpdates = () => {
    return (
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Update Status To"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Carrier"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Tracking ID"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Shipping Date"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Transport Mode"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Origin Address"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Destination Address"
          variant="outlined"
          fullWidth
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />
        <Button variant={"contained"}>Submit</Button>
      </Stack>
    );
  };

  return (
    <>
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={close}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Scroller draggableAt="both">
              {!data && (
                <Stack sx={{ p: 2 }} spacing={2}>
                  <Typography variant={"h6"}>Scan QR Code</Typography>
                  <Typography>
                    Scan the QR code located on a batch or unit to update its
                    status.
                  </Typography>
                  <img src={scanImage} alt="" height={190} />
                </Stack>
              )}
              {data && (
                <Stack sx={{ p: 2 }} spacing={2}>
                  {renderHeader}
                  {renderUpdates()}
                </Stack>
              )}
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default OperatorBottomSheet;
