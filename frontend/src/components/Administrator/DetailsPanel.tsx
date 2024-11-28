import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// components and helpers
import utils from "../../utils/utils";
import QrCodeDialog from "./QrCodeDialog";
import { adminActions } from "./AdminActions";
import Trustness from "../Actions/Trustness";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Stack from "@mui/material/Stack";

interface BatchDetailsPanelProps {
  details: any;
  title: string;
}

const DetailsPanel: React.FC<BatchDetailsPanelProps> = ({ details, title }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openQr, setOpenQr] = React.useState(false);

  const handleBatchQrCode = () => {
    dispatch(adminActions?.getBatchQrCode(id));
    setOpenQr(true);
  };

  const renderValues = () => {
    const acceptedValues = [
      "productId",
      "productType",
      "brand",
      "numberOfItems",
      "expirationDate",
    ];
    if (!details) return null;
    return Object.keys(details).map((key, i) => {
      if (!acceptedValues.includes(key)) {
        return null;
      }
      return (
        <Grid size={{ xs: 6, md: 2.3 }} key={`details-${i}`}>
          <Typography variant={"body2"} sx={{ fontWeight: "bold" }}>
            {utils.toTitleText(key)}
          </Typography>
          <Typography variant={"body1"}>{details[key]}</Typography>
        </Grid>
      );
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid size={"auto"}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                  {title}
                </Typography>
                {title.includes("Batch") && (
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
                )}
              </Stack>
            </Grid>
            {title.includes("Batch") && (
              <Grid size={"auto"}>
                <Button
                  variant={"outlined"}
                  startIcon={<QrCodeIcon />}
                  color={"inherit"}
                  onClick={handleBatchQrCode}
                >
                  Master QR Code
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid size={12}>
          <Divider color={"#fff"} />
        </Grid>
        <Grid size={12}>
          <Grid container spacing={2} justifyContent={"space-evenly"}>
            {renderValues()}
          </Grid>
        </Grid>
      </Grid>
      <QrCodeDialog open={openQr} handleClose={() => setOpenQr(false)} />
    </Paper>
  );
};

export default DetailsPanel;
