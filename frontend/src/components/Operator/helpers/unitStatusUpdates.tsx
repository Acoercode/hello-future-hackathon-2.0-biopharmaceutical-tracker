export const unitStatusUpdates = [
  {
    previousStatus: "Received",
    currentStatus: "Administered",
    inputs: [
      {
        id: "healthcareFacilityName",
        label: "Healthcare Facility Name",
        type: "text",
        required: true,
      },
      {
        id: "healthcareFacilityLocation",
        label: "Healthcare Facility Location",
        type: "text",
        required: true,
      },
      {
        id: "healthcareProvider",
        label: "Healthcare Provider",
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
