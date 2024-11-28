export const trackingPanelHelper = (status: string) => {
  switch (status) {
    case "unprocessed":
      return "Unprocessed Date";
    case "manufactured":
      return "Manufactured Date";
    case "qc-pending":
      return "Quality Control - Pending";
    case "qc-passed":
      return "Quality Control - Passed";
    case "shipped":
      return "Shipped Date";
    case "received":
      return "Received Date";
    case "administered":
      return "Administration Date";
    default:
      return "Unprocessed Date";
  }
};