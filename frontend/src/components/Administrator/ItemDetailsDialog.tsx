import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import TrackingPanel from "./TrackingPanel";
import DetailsMapPanel from "./DetailsMapPanel";
import Trustness from "../Actions/Trustness";

// mui
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import { Divider, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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
  const itemQrCodes = useSelector((state: any) => state.admin.itemQrCodes);
  const itemDetails = useSelector((state: any) => state.admin.itemDetails);
  const trustData = useSelector((state: any) => state.admin.trustData);
  const trustDataLoading = useSelector(
    (state: any) => state.admin.trustLoading,
  );

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
                Item Tracking
              </Typography>
              <Trustness
                type="file"
                score={100}
                verified={
                  trustData && trustData[itemId] && trustData[itemId].verified
                }
                txId={
                  (trustData && trustData[itemId] && trustData[itemId].txId) ||
                  "---"
                }
                checking={
                  trustDataLoading && trustDataLoading[itemId]
                    ? trustDataLoading[itemId]
                    : false
                }
                disabled={false}
              />
            </Stack>
            <Typography>
              #{" "}
              {itemDetails && itemDetails.batch && itemDetails.batch.productId}{" "}
              - {itemDetails && itemDetails.itemNumber}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={"auto"}>
          <Stack direction={"row"} spacing={2}>
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
          <TrackingPanel details={itemDetails} title={"Item Tracking"} />
        </Grid>
        <Grid size={{ xs: 12, md: 8.5 }}>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid size={12}>
              {/*<DetailsPanel details={itemDetails} title={"Unit Details"} />*/}
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid size={"auto"}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Typography
                            variant={"h6"}
                            sx={{ fontWeight: "bold" }}
                          >
                            Item Details
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <Divider color={"#fff"} />
                  </Grid>
                  <Grid size={12}>
                    <Grid
                      container
                      justifyContent={"center"}
                      spacing={2}
                      sx={{ backgroundColor: "#252525", p: 3 }}
                    >
                      <Stack>
                        <img
                          src={
                            itemQrCodes &&
                            itemQrCodes[itemId] &&
                            itemQrCodes[itemId].qrCode
                          }
                          alt="QR Code"
                          height={200}
                        />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          #{" "}
                          {itemQrCodes &&
                            itemQrCodes[itemId] &&
                            itemQrCodes[itemId].itemNumber}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
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
