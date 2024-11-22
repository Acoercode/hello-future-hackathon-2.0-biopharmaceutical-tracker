import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { IconCount } from "./IconCount";
import { adminActions } from "./AdminActions";
import utils from "../../utils/utils";

// mui
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

interface BatchItemsListProps {
  items: any;
}
const BatchItemsList: React.FC<BatchItemsListProps> = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batchList = useSelector((state: any) => state.admin.batchList);

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
      name: "trust",
      label: "Trust",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "itemTracking",
      label: "Item Tracking",
      options: {
        filter: true,
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
      console.log("ROW CLICK");
      // navigate(`/admin/batch/${rowData[0]}`);
    },
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    viewColumns: false,
    print: false,
  };

  console.log("ITEMS", items);

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
