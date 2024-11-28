export const unitStatusUpdates = [
  {
    previousStatus: "Unprocessed",
    currentStatus: "Manufactured",
    inputs: [
      {
        id: "manufacturer",
        label: "Manufacturer",
        type: "text",
        required: true,
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        required: true,
      },
      {
        id: "productionDate",
        label: "Production Date",
        type: "auto",
        required: true,
      },
      {
        id: "productionTime",
        label: "Production Time",
        type: "auto",
        required: true,
      },
      {
        id: "expirationDate",
        label: "Expiration Date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    previousStatus: "Manufactured",
    currentStatus: "QC-Pending",
    inputs: [
      {
        id: "qcStation",
        label: "QC Station",
        type: "text",
        required: true,
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        required: true,
      },
      {
        id: "date",
        label: "Date",
        type: "auto",
        required: true,
      },
      {
        id: "time",
        label: "Time",
        type: "auto",
        required: true,
      },
    ],
  },
  {
    previousStatus: "QC-Pending",
    currentStatus: "QC-Passed",
    inputs: [
      {
        id: "qcStation",
        label: "QC Station",
        type: "text",
        required: true,
      },
      {
        id: "qcInspectorId",
        label: "QC Inspector ID",
        type: "text",
        required: true,
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        required: true,
      },
      {
        id: "date",
        label: "Date",
        type: "auto",
        required: true,
      },
      {
        id: "time",
        label: "Time",
        type: "auto",
        required: true,
      },
    ],
  },
  {
    previousStatus: "QC-Passed",
    currentStatus: "Shipped",
    inputs: [
      {
        id: "carrier",
        label: "Carrier",
        type: "text",
        required: true,
      },
      {
        id: "trackingId",
        label: "Tracking ID",
        type: "text",
        required: true,
      },
      {
        id: "date",
        label: "Date",
        type: "auto",
        required: true,
      },
      {
        id: "time",
        label: "Time",
        type: "auto",
        required: true,
      },
      {
        id: "transportMode",
        label: "Transport Mode",
        type: "text",
        required: true,
      },
      {
        id: "originAddress",
        label: "Origin Address",
        type: "text",
        required: true,
      },
      {
        id: "destinationAddress",
        label: "Destination Address",
        type: "text",
        required: true,
      },
    ],
  },
  {
    previousStatus: "Shipped",
    currentStatus: "Received",
    inputs: [
      {
        id: "receiverLocation",
        label: "Received Location",
        type: "text",
        required: true,
      },
      {
        id: "receiver",
        label: "Receiver",
        type: "text",
        required: true,
      },
      {
        id: "date",
        label: "Date",
        type: "auto",
        required: true,
      },
      {
        id: "time",
        label: "Time",
        type: "auto",
        required: true,
      },
    ],
  },
];
