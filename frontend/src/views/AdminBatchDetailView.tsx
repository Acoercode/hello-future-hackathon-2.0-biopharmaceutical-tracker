import React, { useEffect } from "react";

// components and helpers
import ComponentWrapper from "../containers/ComponentWrapper";

// mui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import controlIcon from "../assets/images/Control.svg";
import { useNavigate } from "react-router-dom";
import BatchDetails from "../components/Administrator/BatchDetails";
import { adminActions } from "../components/Administrator/AdminActions";
import { useDispatch } from "react-redux";

const AdminBatchDetailView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(adminActions?.clearBatchDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };
  return (
    <Grid container justifyContent={"center"} spacing={4}>
      <Grid size={11}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid container alignItems={"center"} spacing={1}>
            <Grid size={"auto"}>
              <img
                src={controlIcon}
                alt={"Back to dashboard"}
                style={{ marginTop: 7, cursor: "pointer" }}
                onClick={handleBack}
              />
            </Grid>
            <Grid size={"auto"}>
              <Typography variant={"h6"}>Back To Dashboard</Typography>
            </Grid>
          </Grid>
          <Typography variant={"h6"}>
            <b>Acme Industries</b> - Atlanta GA
          </Typography>
        </Stack>
      </Grid>
      <Grid size={11}>
        <BatchDetails />
      </Grid>
    </Grid>
  );
};

export default ComponentWrapper(AdminBatchDetailView);
