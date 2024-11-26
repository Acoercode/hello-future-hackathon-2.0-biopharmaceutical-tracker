import React, { useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";

// components and helpers
import scanImage from "../../assets/images/scan_qr.svg";
// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const OperatorBottomSheet: React.FC = () => {
  const ref = useRef<SheetRef>();
  const [isOpen] = useState(true);
  const snapPoints = [-60, 0.5];
  const initialSnap = 1;
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const close = () => snapTo(1);

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
              <Stack justifyContent={"flex-start"} sx={{ p: 2 }} spacing={2}>
                <Typography variant={"h6"}>Scan QR Code</Typography>
                <Typography>
                  Scan the QR code located on a batch or unit to update its
                  status.
                </Typography>
                <img src={scanImage} alt="" height={200} />
              </Stack>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default OperatorBottomSheet;
