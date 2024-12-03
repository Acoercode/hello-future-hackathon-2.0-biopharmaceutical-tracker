import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";

// components and helpers
import { adminActions } from "./AdminActions";
import utils from "../../utils/utils";

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Trustness from "../Actions/Trustness";
import { useParams } from "react-router-dom";
import QrCodeDialog from "./QrCodeDialog";

interface BatchItemsListProps {
  items: any;
  setSelectedItemId: (id: string) => void;
}

const BatchItemsList: React.FC<BatchItemsListProps> = ({
  items,
  setSelectedItemId,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const trustData = useSelector((state: any) => state.admin.trustData);
  const trustDataLoading = useSelector(
    (state: any) => state.admin.trustLoading,
  );
  const [openQr, setOpenQr] = React.useState(false);

  useEffect(() => {
    dispatch(adminActions?.getBatchList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (items && items.length > 0) {
      const itemIds = items.map((item: { _id: any }) => item._id);
      itemIds.forEach((itemId: any) => {
        dispatch(adminActions?.checkTrustness(id, itemId));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleItemQrCodes = () => {
    const itemIds = items.map((item: { _id: any }) => item._id);
    itemIds.forEach((itemId: any) => {
      dispatch(adminActions?.getBatchQrCode(id, itemId));
    });

    setOpenQr(true);
  };

  const handleCloseDialog = () => {
    setOpenQr(false);
    dispatch(adminActions?.clearQrCodes());
  };

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
        customBodyRender: (value: any, tableMeta: any) => {
          const f = tableMeta.rowData[0];
          return (
            <Trustness
              type="file"
              score={100}
              verified={trustData && trustData[f] && trustData[f].verified}
              checking={
                trustDataLoading && trustDataLoading[f]
                  ? trustDataLoading[f]
                  : false
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
            onClick={handleItemQrCodes}
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
          data={items || []}
          columns={columns}
          options={options}
        />
      </Grid>
      <QrCodeDialog open={openQr} handleClose={handleCloseDialog} />
    </Grid>
  );
};
export default BatchItemsList;
