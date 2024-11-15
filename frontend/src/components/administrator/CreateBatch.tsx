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

interface BatchDetails {
  productId: string;
  productType: string;
  brand: string;
  batchNumber: string;
  numberOfItems: string;
}

const CreateBatch: React.FC = () => {
  const navigate = useNavigate();
  const [batchDetails, setBatchDetails] = React.useState<BatchDetails>({
    productId: "",
    productType: "",
    brand: "",
    batchNumber: "",
    numberOfItems: "",
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
    console.log("submit", batchDetails);
    navigate(`/admin/batch/${batchDetails.productId}`);
  };

  return (
    <Grid container justifyContent={"center"} spacing={4}>
      <Grid size={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant={"h6"}>Batch Details</Typography>
            </Grid>
            {createBatchInputs().map((input, index) => (
              <Grid size={4}>
                <Typography>{input.name}</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, input)}
                  fullWidth
                  value={batchDetails[input.id as keyof BatchDetails]}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                  placeholder={input.placeholder}
                  inputProps={{ style: { color: "#0b0b0b" } }}
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
