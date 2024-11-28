import datatableTheme from "../assets/jss/DatatableStyles";

//adds mui theme
export const getDesignTokens = (mode: string) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#FFDB58",
          },
          secondary: {
            main: "#FFFFFF",
          },
          background: {
            default: "#252525",
            paper: "#0D0D0D !important",
          },
          text: {
            primary: "#fff",
            secondary: "#999ba8",
            disabled: "#0b0b0b",
          },
          action: {
            disabledBackground: "#252525",
            disabled: "#0b0b0b",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          secondary: {
            main: "#398377",
          },
          background: {
            default: "#171C19",
            paper: "#1E2423",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#999ba8",
          },
        }),
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 15 },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          minWidth: "100px !important",
          backgroundColor: "#f0f4f9 !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: `#fff !important`,
          "&.Mui-selected": {
            backgroundColor: `#FFDB58 !important`,
            color: `#0b0b0b !important`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: mode === "light" ? "#FFDB58" : "#fff",
          color: mode === "light" ? "#FFDB58" : "#fff",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: mode === "light" ? "#FFDB58" : "#398377",
          color: "#0b0b0b",
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
                            @font-face {
                              font-family: 'Inter';
                              font-style: normal;
                              font-display: swap;
                              src: local('Inter'), local('Inter-Regular'), url(./assets/fonts/Inter/Inter-Regular.ttf) format('ttf');
                              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                            }
                          `,
    },
    ...datatableTheme(mode),
  },
});
