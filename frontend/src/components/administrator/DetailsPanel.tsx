import React from "react";

// components and helpers
import utils from "../../utils/utils";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

interface BatchDetailsPanelProps {
  details: any;
  title: string;
}

const DetailsPanel: React.FC<BatchDetailsPanelProps> = ({ details, title }) => {
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
        <Grid size={2.3} key={`details-${i}`}>
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
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Grid>
            <Grid size={"auto"}>
              <Button variant={"outlined"}>Master QR Code</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Divider color={"#fff"} />
        </Grid>
        <Grid size={12}>
          <Grid container spacing={2}>
            {renderValues()}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailsPanel;
