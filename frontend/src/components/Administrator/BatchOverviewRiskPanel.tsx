import React, { useEffect, useState } from "react";

// components and helpers

// mui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Paper from "@mui/material/Paper";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { adminActions, getBatchItems } from "./AdminActions";

const BatchOverviewRiskPanel: React.FC = () => {
  const dispatch = useDispatch();
  const batchList = useSelector((state: any) => state.admin.batchList);
  const batchItems = useSelector((state: any) => state.admin.batchItems);
  const predictionLoading = useSelector(
    (state: any) => state.admin.predictionLoading,
  );
  const prediction = useSelector((state: any) => state.admin.prediction);
  const [product, setProduct] = useState("Select Product");
  const [productList, setProductList] = useState<any[]>([]);
  const [counts, setCounts] = useState({ administered: 0, other: 0 });
  const [capturedCounts, setCapturedCounts] = useState<string[]>([]);

  useEffect(() => {
    if (batchList && batchList.length > 0) {
      const productIds = batchList
        .map((item: { productId: any }) => item.productId)
        .filter(Boolean);
      // @ts-ignore
      const uniqueProductIds = [...new Set(productIds)];
      setProductList(uniqueProductIds);
    }
  }, [batchList]);

  useEffect(() => {
    if (
      batchItems &&
      batchItems.length > 0 &&
      !capturedCounts.includes(batchItems[0].batchId)
    ) {
      updateCounts(batchItems);
      setCapturedCounts([...capturedCounts, batchItems[0].batchId]);
    }
  }, [batchItems]);

  useEffect(() => {
    if (product && product !== "Select Product") {
      dispatch(adminActions?.getPrediction(product));

      const batchIds = batchList.filter(
        (item: { productId: any }) => item.productId === product,
      );

      batchIds.map((item: { _id: any }) => {
        console.log("item", item);
        dispatch(adminActions?.getBatchItems(item._id, "risk"));
      });
    }
  }, [product]);

  const updateCounts = (list: any[]) => {
    const listCounts = list.reduce(
      (acc, item) => {
        if (item.status === "ADMINISTERED") {
          acc.administered += 1;
        } else {
          acc.other += 1;
        }
        return acc;
      },
      { administered: 0, other: 0 },
    );

    setCounts((prevCounts) => ({
      administered: prevCounts.administered + listCounts.administered,
      other: prevCounts.other + listCounts.other,
    }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setProduct(event.target.value);
    setCapturedCounts([]);
    setCounts({ administered: 0, other: 0 });
  };

  return (
    <div style={{ position: "relative" }}>
      <Grid container justifyContent={"center"} spacing={2}>
        {predictionLoading && (
          <div className="contained-loading-overlay">
            <div className="loader"></div>
          </div>
        )}
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
              Product ID
            </Typography>
            <Select
              id="product"
              value={product}
              onChange={handleChange}
              sx={{ bgcolor: "#fff", color: "#0b0b0b" }}
              size={"small"}
            >
              <MenuItem value={"Select Product"}>
                <em>Select Product</em>
              </MenuItem>
              {productList &&
                productList.map((item: any) => (
                  <MenuItem value={item} key={`risk-${item}`}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        {product && product !== "Select Product" ? (
          <Grid size={11}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Stack direction={"row"} spacing={2} sx={{ pt: 2 }}>
                  <Stack>
                    <Typography variant={"body1"} sx={{ pb: 1 }}>
                      Supply
                    </Typography>
                    <Typography variant={"caption"} sx={{ pb: 1 }}>
                      {counts.administered} Units Administered
                    </Typography>
                    <Typography variant={"caption"} sx={{ pb: 1 }}>
                      {counts.other} Units Manufactured
                    </Typography>
                  </Stack>
                  <Gauge
                    width={200}
                    height={100}
                    value={counts.administered}
                    valueMax={counts.other + counts.administered}
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
                    text={`${((counts.administered / (counts.administered + counts.other)) * 100).toFixed(0)}%`}
                  />
                </Stack>
              </Grid>
              <Grid size={12}>
                <Divider color={"gray"} />
              </Grid>
              <Grid size={12}>
                <Grid container>
                  <Grid size={12}>
                    <Typography variant={"body1"} sx={{ pb: 1 }}>
                      Manufacturing Restart Recommendation
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Grid container>
                      {/*<Grid size={4}>*/}
                      {/*    <Paper sx={{p: 2, bgcolor: "#252525 !important"}}>*/}
                      {/*        <Stack justifyContent={"center"} alignItems={"center"}>*/}
                      {/*            <Typography variant={"body2"}>Demand</Typography>*/}
                      {/*            <TrendingDownRoundedIcon*/}
                      {/*                sx={{fontSize: 60}}*/}
                      {/*                color={"primary"}*/}
                      {/*            />*/}
                      {/*        </Stack>*/}
                      {/*    </Paper>*/}
                      {/*</Grid>*/}
                      <Grid size={12}>
                        <Paper sx={{ p: 2, bgcolor: "#252525 !important" }}>
                          <Stack justifyContent={"center"}>
                            <Typography variant={"caption"}>
                              Current Stock Depletion Rate:{" "}
                              {prediction?.currentStockDepletionRate}
                            </Typography>
                            <br />
                            <Typography variant={"caption"}>
                              Recommended Restart Date:{" "}
                              {prediction?.recommendedRestartDate}
                            </Typography>
                            <br />
                            <Typography variant={"caption"}>
                              {prediction?.reasoning}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid size={11}>
            <Stack spacing={2}>
              <Typography>
                This AI-powered tool predicts when to restart manufacturing for
                a product by analyzing stock depletion rates, safety levels, and
                manufacturing delays.
              </Typography>
              <Typography>
                Start by selecting a product to see intelligent recommendations
                based on current supply data.
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default BatchOverviewRiskPanel;
