import React from "react";

// components and helpers
import { createBatchInputs } from "./helpers/CreateBatchInputs";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { adminActions } from "./AdminActions";
import { useDispatch, useSelector } from "react-redux";

interface BatchDetails {
  productId: string;
  productType: string;
  brand: string;
  numberOfItems: string;
  expirationDate: string;
}

const CreateBatch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createBatchLoading = useSelector(
    (state: any) => state.admin.createBatchLoading,
  );
  const [batchDetails, setBatchDetails] = React.useState<BatchDetails>({
    productId: "",
    productType: "",
    brand: "",
    numberOfItems: "",
    expirationDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: any,
  ) => {
    setBatchDetails({
      ...batchDetails,
      [input.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(adminActions?.createBatch(batchDetails))
      .then((data: { batchId: string }) => {
        navigate(`/admin/batch/${data.batchId}`);
      })
      .catch((error: any) => {
        console.error("Error creating batch:", error);
      });
  };

  return (
    <Grid container justifyContent={"center"} spacing={4}>
      {createBatchLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
      <Grid size={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant={"h6"}>Batch Details</Typography>
            </Grid>
            {createBatchInputs().map((input, index) => (
              <Grid size={4} key={`create-inputs-${index}`}>
                <Typography>{input.name}</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, input)}
                  fullWidth
                  value={batchDetails[input.id as keyof BatchDetails]}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                  placeholder={input.placeholder}
                  inputProps={{ style: { color: "#0d0d0d" } }}
                />
              </Grid>
            ))}
            <Grid size={12} alignSelf={"flex-end"}>
              <Button
                variant={"contained"}
                sx={{ fontWeight: "bold", float: "right" }}
                onClick={handleSubmit}
                disabled={Object.values(batchDetails).some(
                  (value) => value === "",
                )}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateBatch;
