import React from "react";

// components and helpers

// mui
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";

interface QontoConnectorProps {
  level: number;
}

const QontoConnector = styled(StepConnector, {
  shouldForwardProp: (prop) => prop !== "level", // Prevent `level` from being passed to the DOM
})<QontoConnectorProps>(({ theme, level }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: level === 0 ? "#0b0b0b" : "#fff",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: level === 0 ? "#0b0b0b" : "#fff",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[500],
    borderTopWidth: 3,
    borderRadius: 1,
    marginLeft: -8,
    marginTop: -20,
    height: 50,
    marginBottom: -20,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean };
  level: number;
}>(({ theme, ownerState, level }) => ({
  color: level === 0 ? "#0b0b0b" : "#fff",
  display: "flex",
  height: 22,
  alignItems: "center",
  marginRight: 20,
  "& .QontoStepIcon-completedIcon": {
    color: level === 0 ? "#0b0b0b" : "#fff",
    zIndex: 1,
    fontSize: 18,
    marginRight: 20,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: level === 0 ? "#0b0b0b" : "#fff",
    marginRight: 20,
  },
  ...theme.applyStyles("dark", {
    color: theme.palette.grey[700],
  }),
  ...(ownerState.active && {
    color: theme.palette.success.main, // Custom style when active
  }),
}));

function QontoStepIcon(props: StepIconProps, index: number) {
  const { active, className } = props;

  return (
    <QontoStepIconRoot
      ownerState={{ active }}
      className={className}
      level={index}
    >
      <div className="QontoStepIcon-circle" />
    </QontoStepIconRoot>
  );
}

interface BatchTrackingPanelProps {
  details: any;
  title: string;
}

const TrackingPanel: React.FC<BatchTrackingPanelProps> = ({
  details,
  title,
}) => {
  const trackingSteps = [
    {
      title: "Batch Created",
      date: "2021-10-10",
      time: "10:00 AM",
      description: "Batch was created by user",
      location: "New York, NY",
    },
    {
      title: "Batch Created",
      date: "2021-10-10",
      time: "10:00 AM",
      description: "Batch was created by user",
      location: "New York, NY",
    },
  ];

  const renderTrackingCard = () => {
    return trackingSteps.map((step, index) => {
      return (
        <Grid size={12} key={`tracking-${index}`}>
          <Paper
            sx={{
              p: 2,
              bgcolor: index > 0 ? "#252525 !important" : "#FFDB58 !important",
            }}
          >
            <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper
                activeStep={1}
                connector={<QontoConnector level={index} />}
                orientation={"vertical"}
              >
                {trackingSteps.map((label, i) => (
                  <Step key={`${label.title}-${i}`}>
                    <StepLabel
                      StepIconComponent={(e) => QontoStepIcon(e, index)}
                    >
                      <Stack>
                        <Typography
                          sx={{ color: index === 0 ? "#0b0b0b" : "#fff" }}
                        >
                          {label.title}
                        </Typography>
                        <Typography
                          sx={{ color: index === 0 ? "#0b0b0b" : "#fff" }}
                        >
                          {label.date}
                        </Typography>
                      </Stack>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <Paper sx={{ p: 2, height: "85vh" }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid size={"auto"}>
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                # {details && details.productId}
              </Typography>
            </Grid>
            <Grid size={"auto"}>
              <Chip
                label={details && details.status}
                color={"primary"}
                sx={{ fontWeight: "bold" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={2}>
            {renderTrackingCard()}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TrackingPanel;
