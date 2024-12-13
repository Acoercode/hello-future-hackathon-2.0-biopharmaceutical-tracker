import React, { useRef } from "react";
import { useSelector } from "react-redux";

// mui
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import { Divider, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import { useReactToPrint } from "react-to-print";

interface ItemDetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  details: any;
  type: string;
}

const QrCodeDialog: React.FC<ItemDetailsDialogProps> = ({
  open,
  handleClose,
  details,
  type,
}) => {
  const qrCode = useSelector((state: any) => state.admin.batchQrCode);
  const itemQrCodes = useSelector((state: any) => state.admin.itemQrCodes);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"lg"}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "#D9D9D970", backdropFilter: "blur(3px)" },
        },
      }}
    >
      <Grid
        container
        justifyContent={"space-between"}
        sx={{ bgcolor: "#252525", pr: 3, pl: 1, pt: 2 }}
        alignItems={"center"}
      >
        <Grid size={"auto"} sx={{ pl: 3, pb: 2 }}>
          <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
            {type === "item" ? "Item QR Codes" : "Master QR Code"}
          </Typography>
        </Grid>
        <Grid size={"auto"}>
          <Stack direction={"row"} spacing={2}>
            {/*// @ts-ignore*/}
            <Button
              variant={"contained"}
              color={"primary"}
              startIcon={<PrintRoundedIcon />}
              onClick={reactToPrintFn}
            >
              Print
            </Button>
            <IconButton color={"inherit"} onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Grid size={11.5}>
          <Divider color={"gray"} />
        </Grid>
      </Grid>
      <Grid ref={contentRef}>
        {type === "item" && itemQrCodes && Object.keys(itemQrCodes).length ? (
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{ backgroundColor: "#252525", p: 3 }}
          >
            <Grid size={11}>
              <Stack>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ID: {details && details.productId}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Type: {details && details.productType}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Brand: {details && details.brand}
                </Typography>
              </Stack>
            </Grid>
            {Object.keys(itemQrCodes)
              .sort(
                (a, b) => itemQrCodes[a].itemNumber - itemQrCodes[b].itemNumber,
              )
              .map((key: any) => (
                <Stack key={key}>
                  <img
                    src={itemQrCodes[key].qrCode}
                    alt="QR Code"
                    height={200}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    # {itemQrCodes[key].itemNumber}
                  </Typography>
                </Stack>
              ))}
          </Grid>
        ) : (
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{ backgroundColor: "#252525", p: 3 }}
          >
            <Stack>
              <img src={qrCode} alt="QR Code" />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ID: {details && details.productId}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Type: {details && details.productType}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Brand: {details && details.brand}
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default QrCodeDialog;
