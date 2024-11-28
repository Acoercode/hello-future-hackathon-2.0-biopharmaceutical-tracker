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
}

const QrCodeDialog: React.FC<ItemDetailsDialogProps> = ({
  open,
  handleClose,
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
            {itemQrCodes && itemQrCodes.length
              ? "Unit QR Codes"
              : "Master QR Code"}
          </Typography>
        </Grid>
        <Grid size={"auto"}>
          <Stack direction={"row"} spacing={2}>
            {/*<Button*/}
            {/*  variant={"outlined"}*/}
            {/*  color={"inherit"}*/}
            {/*  startIcon={<ShareRoundedIcon />}*/}
            {/*>*/}
            {/*  Share*/}
            {/*</Button>*/}
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
        {itemQrCodes && itemQrCodes.length ? (
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{ backgroundColor: "#252525", p: 3 }}
          >
            {itemQrCodes.map((qr: any, index: number) => (
              <img key={index} src={qr} alt="QR Code" height={200} />
            ))}
          </Grid>
        ) : (
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{ backgroundColor: "#252525", p: 3 }}
          >
            <img src={qrCode} alt="QR Code" />
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default QrCodeDialog;
