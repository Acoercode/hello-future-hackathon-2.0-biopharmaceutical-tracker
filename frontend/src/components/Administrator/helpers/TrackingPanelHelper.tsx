import EventIcon from "@mui/icons-material/Event";
import FactoryIcon from "@mui/icons-material/Factory";
import PlaceIcon from "@mui/icons-material/Place";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import FlakyIcon from "@mui/icons-material/Flaky";

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
      return "Batch Administration Completion Date";
    case "administering":
      return "Batch Administration Start Date";
    default:
      return "Unprocessed Date";
  }
};

export const trackingInfoBatchHelper = (status: string) => {
  switch (status) {
    case "manufactured":
      return ["manufacturer", "location"];
    case "qc-pending":
      return ["qcStation", "location"];
    case "qc-passed":
      return ["qcStation", "qcInspectorId", "location"];
    case "shipped":
      return [
        "carrier",
        "trackingId",
        "transportMode",
        "originAddress",
        "destinationAddress",
      ];
    case "received":
      return ["receiver", "receiverLocation"];
    default:
      return ["location"];
  }
};

export const trackingInfoItemHelper = (status: string) => {
  switch (status) {
    case "administered":
      return [
        "healthcareFacilityName",
        "healthcareFacilityLocation",
        "healthcareProvider",
      ];
    default:
      return ["location"];
  }
};

export const trackingStepIcon = (status: string, index: number) => {
  switch (status) {
    case "manufacturer":
      return (
        <FactoryIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "location":
      return <PlaceIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />;
    case "qcStation":
      return <FlakyIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />;
    case "qcInspectorId":
      return (
        <PersonSearchIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "carrier":
      return (
        <EmojiTransportationIcon
          sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }}
        />
      );
    case "trackingId":
      return (
        <GpsFixedIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "transportMode":
      return (
        <LocalShippingIcon
          sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }}
        />
      );
    case "originAddress":
      return (
        <OutlinedFlagIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "destinationAddress":
      return (
        <SportsScoreIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "receiver":
      return (
        <AccountBoxIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />
      );
    case "receiverLocation":
      return <PlaceIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />;
    case "healthcareFacilityName":
      return (
        <LocalHospitalIcon
          sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }}
        />
      );
    case "healthcareFacilityLocation":
      return <PlaceIcon sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }} />;
    case "healthcareProvider":
      return (
        <MedicalInformationIcon
          sx={{ color: index === 0 ? "#0b0b0b" : "#FFDB58" }}
        />
      );
    default:
      return <EventIcon sx={{ color: index === 0 ? "#0b0b0b" : "#fff" }} />;
  }
};
