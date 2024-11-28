import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import { useSelector } from "react-redux";

// components and helpers
import scanImage from "../../assets/images/scan_qr.svg";
import { batchStatusUpdates } from "./helpers/batchStatusUpdates";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import { Divider, FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import utils from "../../utils/utils";

interface OperatorBottomSheetProps {
  data: any;
  handleSubmit: any;
}

const OperatorBottomSheet: React.FC<OperatorBottomSheetProps> = ({
  data,
  handleSubmit,
}) => {
  const ref = useRef<SheetRef>();
  const batchDetails = useSelector((state: any) => state.admin.batchDetails);
  const recordedActivity = useSelector(
    (state: any) => state.operator.recordedActivity,
  );
  const recordActivityLoading = useSelector(
    (state: any) => state.operator.recordActivityLoading,
  );
  const [isOpen] = useState(true);
  const [inputData, setInputData] = useState<any>({});
  const [statusInputs, setStatusInputs] = useState<any>({});
  const [locationGeo, setLocationGeo] = useState<{}>({
    latitude: null,
    longitude: null,
  });
  const snapPoints = [-70, -200, 0.45, 0.2];
  const initialSnap = 1;
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const close = () => snapTo(1);

  useEffect(() => {
    if (data && recordedActivity) {
      snapTo(1);
    } else if (data) {
      snapTo(0);
    } else {
      snapTo(2);
    }
  }, [data, recordedActivity]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationGeo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log("Location:", locationGeo);

  useEffect(() => {
    if (batchDetails && batchDetails.status) {
      const statusInputs = batchStatusUpdates.filter(
        (item) =>
          item.previousStatus.toLowerCase() ===
          batchDetails.status.toLowerCase(),
      );
      setStatusInputs(statusInputs);
      createInputData(statusInputs[0].inputs, statusInputs);
    }
  }, [batchDetails]);

  const createInputData = (fields: any, data: any) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate.toTimeString().split(" ")[0];

    const inputData = fields.reduce(
      (data: { [x: string]: string }, field: { id: string }) => {
        if (field.id === "date") {
          data[field.id] = formattedDate;
        } else if (field.id === "time") {
          data[field.id] = formattedTime;
        } else {
          data[field.id] = "";
        }
        return data;
      },
      {},
    );

    setInputData({
      ...inputData,
      status: data && data.length && data[0].currentStatus.toUpperCase(),
      geoLocation: locationGeo,
    });
  };

  const handleActivitySubmit = () => {
    handleSubmit(inputData);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const renderHeader = (
    <Grid
      container
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Grid size={"auto"}>
        <Typography variant={"h6"}>Current Status</Typography>
        <Typography variant={"body1"}>
          #
          {recordedActivity
            ? recordedActivity.productId
            : data && data.productId}
        </Typography>
        {/*<Typography variant={"body1"}>{utils.capsToTitleCase(data.brand)}</Typography>*/}
        {/*<Typography variant={"body1"}>{utils.capsToTitleCase(data.productType)}</Typography>*/}
      </Grid>
      <Grid size={"auto"}>
        <Chip
          label={
            recordedActivity
              ? recordedActivity.status
              : batchDetails && batchDetails.status
                ? batchDetails.status
                : "---"
          }
          color={"primary"}
          sx={{ fontWeight: "bold" }}
        />
      </Grid>
      <Grid size={12}>
        <Divider color={"gray"} />
      </Grid>
    </Grid>
  );

  const renderUpdates = () => {
    if (statusInputs.length === 0) {
      return (
        <Typography variant={"body1"}>
          No updates available for this status.
        </Typography>
      );
    } else {
      return (
        <Stack spacing={1}>
          <FormControl fullWidth>
            <Typography>Update Status To</Typography>
            <TextField
              id={"status"}
              name={"status"}
              variant="outlined"
              value={
                statusInputs &&
                statusInputs.length &&
                statusInputs[0].currentStatus
              }
              fullWidth
              sx={{
                bgcolor: "#e5e5e5",
                borderRadius: 2,
                input: { color: "#0b0b0b" },
              }}
              disabled
            />
          </FormControl>
          {statusInputs &&
            statusInputs.length &&
            statusInputs[0].inputs.map((item: any) => (
              <FormControl fullWidth key={`input-${item.id}`}>
                <Typography>{item.label}</Typography>
                <TextField
                  id={item.id}
                  name={item.id}
                  variant="outlined"
                  fullWidth
                  value={inputData[item.id] || ""}
                  placeholder={item.placeholder}
                  onChange={handleInputChange}
                  sx={{
                    bgcolor:
                      item.id === "date" || item.id === "time"
                        ? "#e5e5e5"
                        : "#fff",
                    borderRadius: 2,
                    input: { color: "#0b0b0b" },
                  }}
                  disabled={item.id === "date" || item.id === "time"}
                />
              </FormControl>
            ))}
          <Button
            variant={"contained"}
            disabled={Object.values(inputData).some((value) => value === "")}
            onClick={handleActivitySubmit}
          >
            Submit
          </Button>
        </Stack>
      );
    }
  };

  const renderRecordedActivity = () => {
    let activities: any = [];
    if (
      recordedActivity &&
      recordedActivity.activities &&
      recordedActivity.activities.length
    ) {
      const clonedActivities = [...recordedActivity.activities]; // Clone the array
      if (clonedActivities.length > 1) {
        activities = clonedActivities.pop(); // Safe operation on the cloned array
      } else if (clonedActivities.length === 1) {
        activities = clonedActivities[0]; // Retrieve the only item
      }
    }

    if (activities) {
      return (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {Object.keys(activities).map((item: any) => (
            <ListItem key={`input-${item}`}>
              <ListItemText
                primary={utils.toTitleText(item)}
                secondary={activities[item]}
              />
            </ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <>
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={close}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Scroller draggableAt="both">
              {/* Loading Overlay */}
              {recordActivityLoading && (
                <div className="loading-overlay">
                  <div className="loader"></div>
                </div>
              )}
              {!data && !recordedActivity && (
                <Stack sx={{ p: 2 }} spacing={2}>
                  <Typography variant={"h6"}>Scan QR Code</Typography>
                  <Typography>
                    Scan the QR code located on a batch or unit to update its
                    status.
                  </Typography>
                  <img src={scanImage} alt="" height={190} />
                </Stack>
              )}
              {recordedActivity && (
                <Stack sx={{ p: 2 }} spacing={2}>
                  {renderHeader}
                  {renderRecordedActivity()}
                </Stack>
              )}
              {data &&
                (!batchDetails || !batchDetails.status) &&
                !recordedActivity && (
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                )}
              {data &&
                batchDetails &&
                batchDetails.status &&
                !recordedActivity && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    {renderHeader}
                    {renderUpdates()}
                  </Stack>
                )}
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default OperatorBottomSheet;
