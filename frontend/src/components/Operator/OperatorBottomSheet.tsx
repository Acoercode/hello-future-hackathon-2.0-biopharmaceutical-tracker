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
import { unitStatusUpdates } from "./helpers/unitStatusUpdates";

interface OperatorBottomSheetProps {
  data: any;
  handleSubmit: any;
  type: string;
}

const OperatorBottomSheet: React.FC<OperatorBottomSheetProps> = ({
  data,
  handleSubmit,
  type,
}) => {
  const ref = useRef<SheetRef>();
  const batchDetails = useSelector((state: any) => state.admin.batchDetails);
  const itemDetails = useSelector((state: any) => state.admin.itemDetails);
  const recordedActivity = useSelector(
    (state: any) => state.operator.recordedActivity,
  );
  const recordActivityLoading = useSelector(
    (state: any) => state.operator.recordActivityLoading,
  );
  const [isOpen] = useState(true);
  const [inputData, setInputData] = useState<any>({});
  const [statusInputs, setStatusInputs] = useState<any>({});
  const [address, setAddress] = useState("Fetching address...");
  const [addressError, setAddressError] = useState<boolean>(false);
  const [locationGeo, setLocationGeo] = useState<{
    latitude: any;
    longitude: any;
  }>({
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

  useEffect(() => {
    const fetchAddress = async () => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${locationGeo.latitude}&lon=${locationGeo.longitude}&format=json`;
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "YourAppName", // Add a user agent
          },
        });
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress("");
          setAddressError(true);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("");
        setAddressError(true);
      }
    };
    if (locationGeo.latitude && locationGeo.longitude) {
      fetchAddress();
    }
  }, [locationGeo]);

  useEffect(() => {
    if (
      batchDetails &&
      (batchDetails.status === "RECEIVED" ||
        batchDetails.status === "ADMINISTERING" ||
        batchDetails.status === "ADMINISTERED")
    ) {
      setStatusInputs([]);
      setInputData({});
      snapTo(2);
    } else if (
      batchDetails &&
      batchDetails.status &&
      batchDetails.status !== "RECEIVED"
    ) {
      const statusInputs = batchStatusUpdates.filter(
        (item) =>
          item.previousStatus.toLowerCase() ===
          batchDetails.status.toLowerCase(),
      );
      setStatusInputs(statusInputs);
      createInputData(statusInputs[0].inputs, statusInputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchDetails]);

  useEffect(() => {
    if (itemDetails && itemDetails.status === "ADMINISTERED") {
      setStatusInputs([]);
      setInputData({});
      snapTo(2);
    } else if (
      itemDetails &&
      itemDetails.batch &&
      itemDetails.batch.status &&
      itemDetails.batch.status !== "ADMINISTERING" &&
      itemDetails.batch.status !== "RECEIVED"
    ) {
      setStatusInputs([]);
      setInputData({});
      snapTo(2);
    } else if (
      itemDetails &&
      itemDetails.status &&
      itemDetails.status !== "ADMINISTERED"
    ) {
      setStatusInputs(unitStatusUpdates);
      createInputData(unitStatusUpdates[0].inputs, unitStatusUpdates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetails]);

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
      location: address,
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
        {data && data.productType && data.brand && (
          <Typography variant={"body1"}>
            {utils.capsToTitleCase(data.productType)} -{" "}
            {utils.capsToTitleCase(data.brand)}
          </Typography>
        )}
        {type === "batch" && (
          <Typography variant={"body1"}>
            #
            {recordedActivity
              ? recordedActivity.productId
              : data && `${data.productId}`}
          </Typography>
        )}
        {type === "item" && (
          <Typography variant={"body1"}>
            #
            {recordedActivity
              ? recordedActivity.batch &&
                `${recordedActivity.batch.productId}-${recordedActivity.itemNumber}`
              : itemDetails &&
                itemDetails.batch &&
                `${itemDetails.batch.productId}-${itemDetails.itemNumber}`}
          </Typography>
        )}
      </Grid>
      <Grid size={"auto"}>
        {type === "batch" && (
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
        )}
        {type === "item" && (
          <Chip
            label={recordedActivity ? recordedActivity.status : "RECEIVED"}
            color={"primary"}
            sx={{ fontWeight: "bold" }}
          />
        )}
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
                  error={item.id === "location" && addressError}
                  helperText={
                    item.id === "location" &&
                    addressError &&
                    "Unable to fetch address. Please populate accordingly."
                  }
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
    const ignoreKeys = ["status", "geoLocation"];
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
          {Object.keys(activities).map((item: any) => {
            if (!ignoreKeys.includes(item)) {
              return (
                <ListItem key={`input-${item}`}>
                  <ListItemText
                    primary={utils.toTitleText(item)}
                    secondary={
                      item === "date"
                        ? utils.formatDate(activities[item], "L")
                        : activities[item]
                    }
                  />
                </ListItem>
              );
            }
            return null;
          })}
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
              {type === "batch" &&
                data &&
                batchDetails &&
                batchDetails.status === "RECEIVED" && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    <Typography variant={"h6"}>Batch Received</Typography>
                    <Typography>
                      The batch has been received and is awaiting
                      administration.
                    </Typography>
                    <Typography>
                      Please scan an item in the batch to update its status.
                    </Typography>
                  </Stack>
                )}
              {type === "batch" &&
                data &&
                batchDetails &&
                batchDetails.status === "ADMINISTERING" && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    <Typography variant={"h6"}>
                      Batch Administration in Process
                    </Typography>
                    <Typography>
                      This batch is in the process of administration.
                    </Typography>
                    <Typography>
                      Please scan an item in the batch to update its status.
                    </Typography>
                  </Stack>
                )}
              {type === "batch" &&
                data &&
                batchDetails &&
                batchDetails.status === "ADMINISTERED" && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    <Typography variant={"h6"}>Batch Administered</Typography>
                    <Typography>
                      The batch has completed item administration.
                    </Typography>
                    <Typography>
                      Please scan a different batch to update its status.
                    </Typography>
                  </Stack>
                )}
              {type === "item" &&
                data &&
                itemDetails &&
                itemDetails.status === "ADMINISTERED" && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    <Typography variant={"h6"}>Item Administered</Typography>
                    <Typography>
                      This item has already been administered.
                    </Typography>
                    <Typography>
                      Please scan another item in the batch to update its
                      status.
                    </Typography>
                  </Stack>
                )}
              {type === "item" &&
                data &&
                itemDetails &&
                itemDetails.status !== "ADMINISTERED" &&
                itemDetails.batch &&
                itemDetails.batch.status &&
                itemDetails.batch.status !== "ADMINISTERING" &&
                itemDetails.batch.status !== "RECEIVED" && (
                  <Stack sx={{ p: 2 }} spacing={2}>
                    <Typography variant={"h6"}>
                      Item Not Administering
                    </Typography>
                    <Typography>
                      This item is not available for administration.
                    </Typography>
                    <Typography>
                      Please scan another item in the batch to update its
                      status.
                    </Typography>
                  </Stack>
                )}
              {data &&
                (!batchDetails || !batchDetails.status) &&
                !recordedActivity &&
                !itemDetails && (
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
                ((type === "item" &&
                  itemDetails &&
                  itemDetails.status &&
                  itemDetails.status !== "ADMINISTERED" &&
                  itemDetails.batch &&
                  (itemDetails.batch.status === "ADMINISTERING" ||
                    itemDetails.batch.status === "RECEIVED") &&
                  !recordedActivity) ||
                  (type === "batch" &&
                    batchDetails &&
                    batchDetails.status &&
                    batchDetails.status !== "RECEIVED" &&
                    batchDetails.status !== "ADMINISTERED" &&
                    batchDetails.status !== "ADMINISTERING" &&
                    !recordedActivity)) && (
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
