import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { IconCount } from "./IconCount";
import { adminActions } from "./AdminActions";
import utils from "../../utils/utils";
import Trustness from "../Actions/Trustness";
import administeredIcon from "../../assets/images/administeredIcon.svg";
import manufacturedIcon from "../../assets/images/manufacturedIcon.svg";
// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BatchOverviewRiskPanel from "./BatchOverviewRiskPanel";

const BatchOverview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batchList = useSelector((state: any) => state.admin.batchList);

  useEffect(() => {
    dispatch(adminActions?.getBatchList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusData = [
    {
      title: "Batches Manufactured",
      color: "#0b0b0b",
      data: 200,
      image: manufacturedIcon,
    },
    {
      title: "Batches Administered",
      color: "#0b0b0b",
      data: 100,
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
    <Grid container justifyContent={"center"} spacing={3}>
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
    </Grid>
  );
};

export default BatchOverview;
