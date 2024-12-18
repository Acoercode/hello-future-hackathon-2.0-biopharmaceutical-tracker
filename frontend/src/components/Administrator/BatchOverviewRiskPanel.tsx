import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import startIcon from "../../assets/images/start_icon.svg";
import calendarIcon from "../../assets/images/calendar_icon.svg";
import rateIcon from "../../assets/images/rate_icon.svg";
import summaryIcon from "../../assets/images/summary_icon.svg";

// mui
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, TextField, Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import CircleIcon from "@mui/icons-material/Circle";

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
  const [safetyStock, setSafetyStock] = useState<number | null>(50);
  const [manufacturingDelay, setManufacturingDelay] = useState<number | null>(
    5,
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchItems]);

  useEffect(() => {
    if (product && product !== "Select Product") {
      dispatch(
        adminActions?.getPrediction(product, safetyStock, manufacturingDelay),
      );

      const batchIds = batchList.filter(
        (item: { productId: any }) => item.productId === product,
      );

      batchIds.forEach((item: { _id: any }) => {
        dispatch(adminActions?.getBatchItems(item._id, "risk"));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const updateCounts = (list: any[]) => {
    const listCounts = list.reduce(
      (acc, item) => {
        if (item.status === "ADMINISTERED") {
          acc.administered += 1;
          acc.other += 1;
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

  const handlePredictChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    if (name === "safetyStock") {
      if (value === "") {
        return setSafetyStock(null);
      }
      setSafetyStock(parseInt(value));
    } else if (name === "manufacturingDelay") {
      if (value === "") {
        return setManufacturingDelay(null);
      }
      setManufacturingDelay(parseInt(value));
    }
  };

  const handlePredictSubmit = () => {
    dispatch(
      adminActions?.getPrediction(product, safetyStock, manufacturingDelay),
    );
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
            <Select
              id="product"
              value={product}
              onChange={handleChange}
              sx={{ bgcolor: "#fff", color: "#0d0d0d" }}
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
                <Stack direction={"row"} spacing={2}>
                  <Grid container>
                    <Grid size={6}>
                      <Typography variant={"body1"}>Supply</Typography>
                    </Grid>
                    <Grid size={"auto"}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <CircleIcon
                          sx={{ fontSize: "medium" }}
                          color={"primary"}
                        />
                        <Typography variant={"caption"}>
                          {counts.administered} Items Administered
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={"auto"}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <CircleIcon
                          sx={{ fontSize: "medium", color: "#252525" }}
                        />
                        <Typography variant={"caption"}>
                          {counts.other} Items Manufactured
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent={"center"}>
                    <Grid size={"auto"}>
                      <Gauge
                        width={200}
                        height={100}
                        value={counts.administered}
                        valueMax={counts.other}
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
                        text={`${((counts.administered / counts.other) * 100).toFixed(0)}%`}
                      />
                    </Grid>
                    <Grid size={"auto"}>
                      <Typography variant={"caption"}>
                        Items Administered
                      </Typography>
                    </Grid>
                  </Grid>
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
                    <Grid
                      container
                      spacing={1}
                      alignItems={"flex-end"}
                      justifyContent={"space-between"}
                    >
                      <Grid size={5}>
                        <FormControl fullWidth>
                          <Typography variant={"caption"} color={"primary"}>
                            Safety Stock
                          </Typography>
                          <TextField
                            id="safety stock"
                            type="number"
                            name={"safetyStock"}
                            size={"small"}
                            value={safetyStock}
                            onChange={(e) => handlePredictChange(e)}
                            sx={{
                              input: {
                                background: "#252525",
                                borderRadius: 1,
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid size={5}>
                        <FormControl fullWidth>
                          <Typography variant={"caption"} color={"primary"}>
                            Manufacturing Delay
                          </Typography>
                          <TextField
                            id="delay"
                            type="number"
                            name={"manufacturingDelay"}
                            size={"small"}
                            value={manufacturingDelay}
                            onChange={(e) => handlePredictChange(e)}
                            sx={{
                              input: {
                                background: "#252525",
                                borderRadius: 1,
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid size={"auto"}>
                        <Tooltip title={"Run Prediction"}>
                          <IconButton
                            onClick={handlePredictSubmit}
                            disabled={!safetyStock || !manufacturingDelay}
                            sx={{ mb: -0.6 }}
                          >
                            <img src={startIcon} alt="" height={35} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid size={12} sx={{ pt: 1 }}>
                        <Grid container spacing={2}>
                          <Grid size={6}>
                            <Stack direction={"row"} spacing={1}>
                              <img src={rateIcon} alt="" height={30} />
                              <Stack>
                                <Typography
                                  variant={"caption"}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  Current Stock Depletion Rate
                                </Typography>
                                <Typography variant={"caption"}>
                                  {predictionLoading
                                    ? "---"
                                    : prediction?.currentStockDepletionRate}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid size={6}>
                            <Stack direction={"row"} spacing={1}>
                              <img src={calendarIcon} alt="" height={30} />
                              <Stack>
                                <Typography
                                  variant={"caption"}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  Recommended Restart Date
                                </Typography>
                                <Typography variant={"caption"}>
                                  {predictionLoading
                                    ? "---"
                                    : prediction?.recommendedRestartDate}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid size={12}>
                            <Stack direction={"row"} spacing={1}>
                              <img src={summaryIcon} alt="" height={30} />
                              <Stack>
                                <Typography
                                  variant={"caption"}
                                  sx={{ fontWeight: "bold" }}
                                >
                                  Summary
                                </Typography>
                                <Typography variant={"caption"}>
                                  {predictionLoading
                                    ? "---"
                                    : prediction?.reasoning}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
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
