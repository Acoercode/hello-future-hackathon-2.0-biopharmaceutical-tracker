import React, { useEffect, useState } from "react";

// components and helpers

// mui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import utils from "../../utils/utils";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Paper from "@mui/material/Paper";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
const BatchOverviewRiskPanel: React.FC = () => {
  const theme = useTheme();
  const batchList = useSelector((state: any) => state.admin.batchList);
  const [product, setProduct] = useState("");
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    if (batchList && batchList.length > 0) {
      const productTypes = batchList
        .map((item: { productType: any }) => item.productType)
        .filter(Boolean);
      // @ts-ignore
      const uniqueProductTypes = [...new Set(productTypes)];
      setProductList(uniqueProductTypes);
      setProduct(uniqueProductTypes[0]);
    }
  }, [batchList]);

  const handleChange = (event: SelectChangeEvent) => {
    setProduct(event.target.value);
  };

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid size={11}>
        <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
          Product Supply Risk Prediction
        </Typography>
      </Grid>
      <Grid size={11}>
        <Divider color={"gray"} />
      </Grid>
      <Grid size={11}>
        <FormControl fullWidth>
          <Typography variant={"body2"} sx={{ pb: 1 }}>
            Product Type
          </Typography>
          <Select
            id="product"
            value={product}
            label="Product Type"
            onChange={handleChange}
            sx={{ bgcolor: "#fff", color: "#0b0b0b" }}
            size={"small"}
          >
            {productList &&
              productList.map((item: any) => (
                <MenuItem value={item} key={`risk-${item}`}>
                  {utils.capsToTitleCase(item)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={11}>
        <Stack direction={"row"} spacing={2} sx={{ pt: 2 }}>
          <Stack>
            <Typography variant={"body1"} sx={{ pb: 1 }}>
              Supply
            </Typography>
            <Typography variant={"caption"} sx={{ pb: 1 }}>
              120 Units Administered
            </Typography>
            <Typography variant={"caption"} sx={{ pb: 1 }}>
              280 Units Manufactured
            </Typography>
          </Stack>
          <Gauge
            width={200}
            height={100}
            value={120}
            valueMax={280}
            startAngle={-90}
            endAngle={90}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: "translate(0px, -10px)",
                color: "#FFDB58",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: "#252525",
              },
            }}
            text={() => `43%`}
          />
        </Stack>
      </Grid>
      <Grid size={11}>
        <Divider color={"gray"} />
      </Grid>
      <Grid size={11}>
        <Grid container>
          <Grid size={12}>
            <Typography variant={"body1"} sx={{ pb: 1 }}>
              Manufacturing Restart Recommendation
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Paper sx={{ p: 2, bgcolor: "#252525 !important" }}>
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"body2"}>Demand</Typography>
                    <TrendingDownRoundedIcon
                      sx={{ fontSize: 60 }}
                      color={"primary"}
                    />
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={8}>
                <Paper sx={{ p: 2, bgcolor: "#252525 !important" }}>
                  <Stack justifyContent={"center"}>
                    <Typography variant={"body2"}>Action</Typography>
                    <Typography variant={"caption"}>
                      - Decrease production by 20%
                    </Typography>
                    <Typography variant={"caption"}>
                      - Monitor Supply Chain Weekly
                    </Typography>
                    <Typography variant={"caption"}>
                      - Monitor Supply Chain Weekly
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BatchOverviewRiskPanel;
