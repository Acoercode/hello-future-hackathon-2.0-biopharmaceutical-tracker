import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import TrackingPanel from "./TrackingPanel";
import DetailsPanel from "./DetailsPanel";
import DetailsMapPanel from "./DetailsMapPanel";
import Trustness from "../Actions/Trustness";

// mui
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import { Divider, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";

interface ItemDetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  itemId: string;
}

const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({
  open,
  itemId,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const itemDetails = useSelector((state: any) => state.admin.itemDetails);

  useEffect(() => {
    return () => dispatch(adminActions?.clearItemDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(adminActions?.getItemDetails(id, itemId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

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
          <Stack spacing={1}>
            <Stack direction={"row"} spacing={2}>
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                Unit Tracking
              </Typography>
              <Trustness
                type="file"
                score={
                  100
                  // trustData.files &&
                  // trustData.files[f.id] &&
                  // trustData.files[f.id].trust &&
                  // trustData.files[f.id].trust.score
                }
                verified={
                  true
                  // trustData.files &&
                  // trustData.files[f.id] &&
                  // trustData.files[f.id].trust &&
                  // trustData.files[f.id].trust.verified
                }
                checking={
                  false
                  // trustData.files &&
                  // trustData.files[f.id] &&
                  // trustData.files[f.id].checkingTrust
                }
                onExpertVerification={
                  () => console.log("validate")
                  // window.open(
                  //     `https://ledger.hashlog.io/tx/${f.transactionId}`,
                  //     '_blank'
                  // )
                }
                disabled={false}
              />
            </Stack>
            <Typography>
              # {itemDetails && itemDetails.batch.productId} -{" "}
              {itemDetails && itemDetails.itemNumber}
            </Typography>
          </Stack>
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
            {/*<Button*/}
            {/*  variant={"contained"}*/}
            {/*  color={"primary"}*/}
            {/*  startIcon={<PrintRoundedIcon />}*/}
            {/*>*/}
            {/*  Print*/}
            {/*</Button>*/}
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
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{ backgroundColor: "#252525", p: 3 }}
      >
        <Grid size={{ xs: 12, md: 3.5 }}>
          <TrackingPanel details={itemDetails} title={"Unit Tracking"} />
        </Grid>
        <Grid size={{ xs: 12, md: 8.5 }}>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid size={12}>
              <DetailsPanel details={itemDetails} title={"Unit Details"} />
            </Grid>
            <Grid size={12}>
              <DetailsMapPanel />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ItemDetailsDialog;
