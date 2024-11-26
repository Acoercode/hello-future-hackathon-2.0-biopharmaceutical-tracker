import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import utils from "../../utils/utils";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Trustness from "../Actions/Trustness";

interface BatchItemsListProps {
  items: any;
  setSelectedItemId: (id: string) => void;
}

const BatchItemsList: React.FC<BatchItemsListProps> = ({
  items,
  setSelectedItemId,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions?.getBatchList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      name: "itemNumber",
      label: "Item Number",
      options: {
        filter: false,
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
    {
      name: "itemTracking",
      label: "Item Tracking",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => {
          return "View Details";
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
      setSelectedItemId(rowData[0]);
    },
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    viewColumns: false,
    print: false,
    customToolbar: () => {
      return (
        <React.Fragment>
          <Button
            startIcon={<QrCodeIcon />}
            variant={"outlined"}
            color={"inherit"}
          >
            Item QR Codes
          </Button>
        </React.Fragment>
      );
    },
  };

  return (
    <Grid container justifyContent={"center"} spacing={3}>
      <Grid size={12}>
        <MUIDataTable
          title={
            <Typography variant={"h6"} sx={{ fontWeight: "bold", pl: 1 }}>
              Item Details
            </Typography>
          }
          data={items && items.items}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default BatchItemsList;
