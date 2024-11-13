import React from "react";
import MUIDataTable from "mui-datatables";

// components and helpers
import { IconCount } from "./IconCount";

// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const BatchOverview: React.FC = () => {
  const statusData = [
    {
      title: "Total Batches",
      color: "#0b0b0b",
      data: 200,
      image: "https://placehold.co/400",
    },
    {
      title: "Active Batches",
      color: "#0b0b0b",
      data: 100,
      image: "https://placehold.co/400",
    },
    {
      title: "Inactive Batches",
      color: "#0b0b0b",
      data: 100,
      image: "https://placehold.co/400",
    },
  ];

  const columns = [
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
      },
    },
    {
      name: "productType",
      label: "Product Type",
      options: {
        filter: true,
        sort: false,
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
    {
      name: "batchNumber",
      label: "Batch Number",
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
        filter: true,
        sort: false,
      },
    },
  ];

  const data = [
    {
      productId: "1234567",
      status: "Administered",
      productType: "Abcde",
      brand: "Fghijk",
      batchNumber: "123456",
      expirationDate: "2025-12-31",
      trust: "Yes",
    },
    {
      productId: "1234567",
      status: "QA - Passed",
      productType: "Abcde",
      brand: "Fghijk",
      batchNumber: "123456",
      expirationDate: "2025-12-31",
      trust: "Yes",
    },
    {
      productId: "1234567",
      status: "QC - Pending",
      productType: "Abcde",
      brand: "Fghijk",
      batchNumber: "123456",
      expirationDate: "2025-12-31",
      trust: "Yes",
    },
    {
      productId: "1234567",
      status: "Administered",
      productType: "Abcde",
      brand: "Fghijk",
      batchNumber: "123456",
      expirationDate: "2025-12-31",
      trust: "Yes",
    },
    {
      productId: "1234567",
      status: "Received",
      productType: "Abcde",
      brand: "Fghijk",
      batchNumber: "123456",
      expirationDate: "2025-12-31",
      trust: "Yes",
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    onRowClick: (
      rowData: string[],
      rowMeta: { dataIndex: number; rowIndex: number },
    ) => {
      console.log(rowData, rowMeta);
    },
  };

  return (
    <Grid container justifyContent={"center"} spacing={3}>
      {statusData.map((data) => (
        <IconCount count={data} data={data.data} width={4} />
      ))}
      <Grid size={12}>
        <MUIDataTable
          title={
            <Button
              variant={"contained"}
              sx={{ fontWeight: "bold" }}
              startIcon={<AddIcon />}
            >
              Create New Batch
            </Button>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default BatchOverview;
