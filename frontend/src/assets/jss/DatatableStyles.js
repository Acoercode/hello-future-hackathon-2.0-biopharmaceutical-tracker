import { createTheme } from "@mui/material/styles";

// set theme overrides for mui datatables package
const datatableTheme = (mode) =>
  createTheme({
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          margin: "0 !important",
        },
        displayedRows: {
          margin: "0 !important",
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        data: {
          fontWeight: "bold !important",
          justifyContent: "left",
        },
        contentWrapper: {
          justifyContent: "left",
        },
        root: {
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      },
    },
    MUIDataTableBodyRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: mode === "light" ? "#4168AE08" : "#373D3B",
          },
          "&:hover": {
            backgroundColor:
              mode === "light" ? "#00857715 !important" : "#265B5F !important",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 5,
        },
        head: {
          fontWeight: "bold !important",
        },
      },
    },
    MUIDataTable: {
      styleOverrides: {
        paper: {
          padding: 10,
        },
        responsiveScrollFullHeight: {
          maxHeight: "none",
          overflow: "auto",
        },
      },
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          overflow: "auto",
        },
        responsiveStackedSmallParent: {
          maxWidth: "100%",
        },
      },
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          paddingRight: "0px !important",
          paddingLeft: "0px !important",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
  });

export default datatableTheme;
