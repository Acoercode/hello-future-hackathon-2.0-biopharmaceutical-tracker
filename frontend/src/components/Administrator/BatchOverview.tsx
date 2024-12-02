import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { IconCount } from "./IconCount";
import { adminActions, facetQuery } from "./AdminActions";
import utils from "../../utils/utils";
import Trustness from "../Actions/Trustness";
import administeredIcon from "../../assets/images/administeredIcon.svg";
import manufacturedIcon from "../../assets/images/manufacturedIcon.svg";
import BatchOverviewRiskPanel from "./BatchOverviewRiskPanel";

// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { Divider } from "@mui/material";

const BatchOverview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batchList = useSelector((state: any) => state.admin.batchList);
  const facets = useSelector((state: any) => state.admin.facets);
  const [batchStatusData, setBatchStatusData] = React.useState<any[]>([]);
  const [batchBrandData, setBatchBrandData] = React.useState<any[]>([]);
  const [batchTypeData, setBatchTypeData] = React.useState<any[]>([]);
  const [manufacturedCount, setManufacturedCount] = React.useState<number>(0);
  const [administeredCount, setAdministeredCount] = React.useState<number>(0);

  useEffect(() => {
    dispatch(adminActions?.getBatchList());
    dispatch(adminActions?.facetQuery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const colorPalette = [
      "#E8C658",
      "#1E90FF",
      "#696969",
      "#FF69B4",
      "#D64242",
      "#87CEEB",
      "#6B58E8",
      "#FFA500",
      "#00CED1",
      "#32CD32",
      "#006EDB",
    ];
    if (facets && facets.length) {
      if (facets[0].statuses) {
        const data: React.SetStateAction<any[]> = [];
        facets[0].statuses.forEach(
          (status: { _id: any; count: any }, i: any) => {
            data.push({
              id: status._id,
              label: utils.capsToTitleCase(status._id),
              color: colorPalette[i],
              value: status.count,
            });
            if (status._id.toLowerCase() === "administered") {
              setAdministeredCount(status.count);
            }
          },
        );
        let totalBatches = data.reduce((total, item) => total + item.value, 0);
        setManufacturedCount(totalBatches);
        setBatchStatusData(data);
      }
      if (facets[0].productTypes) {
        const data: React.SetStateAction<any[]> = [];
        facets[0].productTypes.forEach(
          (status: { _id: any; count: any }, i: any) => {
            data.push({
              id: status._id,
              label: utils.capsToTitleCase(status._id),
              color: colorPalette[i],
              value: status.count,
            });
          },
        );
        setBatchTypeData(data);
      }
      if (facets[0].brands) {
        const data: React.SetStateAction<any[]> = [];
        facets[0].brands.forEach((status: { _id: any; count: any }, i: any) => {
          data.push({
            id: status._id,
            label: utils.capsToTitleCase(status._id),
            color: colorPalette[i],
            value: status.count,
          });
        });
        setBatchBrandData(data);
      }
    }
  }, [facets]);

  const statusData = [
    {
      title: "Batches Manufactured",
      color: "#0b0b0b",
      data: manufacturedCount,
      image: manufacturedIcon,
    },
    {
      title: "Batches Administered",
      color: "#0b0b0b",
      data: administeredCount,
      image: administeredIcon,
    },
  ];

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "productId",
      label: "Product ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: string) => {
          if (value) {
            return utils.capsToTitleCase(value);
          } else {
            return "Pending Status";
          }
        },
      },
    },
    {
      name: "productType",
      label: "Product Type",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: string) => {
          if (value) {
            return utils.capsToTitleCase(value);
          } else {
            return "Pending Status...";
          }
        },
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "batchNumber",
    //   label: "Batch Number",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: "numberOfItems",
      label: "Number of Units",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "expirationDate",
      label: "Expiration Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "trust",
      label: "Trust",
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => {
          return (
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
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    onRowClick: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number },
    ) => {
      navigate(`/admin/batch/${rowData[0]}`);
    },
    viewColumns: false,
    print: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} sx={{ mb: 3 }}>
      <Grid size={8}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Stack direction={"row"} spacing={3}>
              {statusData.map((data, i) => (
                <IconCount
                  count={data}
                  data={data.data}
                  width={6}
                  key={`count-${i}`}
                />
              ))}
            </Stack>
          </Grid>
          <Grid size={12}>
            <MUIDataTable
              title={
                <Button
                  variant={"contained"}
                  sx={{ fontWeight: "bold" }}
                  startIcon={<AddIcon sx={{ color: "#0b0b0b !important" }} />}
                  onClick={() => navigate("/admin/create")}
                >
                  Create New Batch
                </Button>
              }
              data={batchList || []}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <BatchOverviewRiskPanel />
        </Paper>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                Batch Status
              </Typography>
            </Grid>
            <Grid size={12}>
              <Divider sx={{ borderColor: "gray" }} variant={"fullWidth"} />
            </Grid>
            <Grid size={12}>
              <PieChart
                series={[
                  {
                    data: batchStatusData,
                  },
                ]}
                margin={{ right: 180 }}
                height={300}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                Batch Product Types
              </Typography>
            </Grid>
            <Grid size={12}>
              <Divider sx={{ borderColor: "gray" }} variant={"fullWidth"} />
            </Grid>
            <Grid size={12}>
              <PieChart
                series={[
                  {
                    data: batchTypeData,
                  },
                ]}
                height={300}
                margin={{ right: 180 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={4}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                Batch Brands
              </Typography>
            </Grid>
            <Grid size={12}>
              <Divider sx={{ borderColor: "gray" }} variant={"fullWidth"} />
            </Grid>
            <Grid size={12}>
              <PieChart
                loading={batchBrandData.length === 0}
                series={[
                  {
                    data: batchBrandData,
                  },
                ]}
                height={300}
                margin={{ right: 180 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BatchOverview;
