import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

export interface ICountProps {
  title: string;
  color: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  image?: any;
  icon?: any;
  paperElevation?: number;
}

export interface IIconCountProps {
  count: ICountProps;
  data: number;
  width: number;
}

export const IconCount: React.FC<IIconCountProps> = ({
  count,
  data,
  width,
}) => {
  return (
    <Grid size={{ xs: 12, md: width }} key={`counts-${count.title}`}>
      <Paper
        elevation={count.paperElevation ? count.paperElevation : 4}
        sx={{
          p: 2,
          backgroundImage: count.color,
          backgroundColor: count.color,
        }}
      >
        <Grid container alignItems={"center"} spacing={6}>
          {count.image && (
            <Grid size={2}>
              <img src={count.image} alt="" width={50} height={50} />
            </Grid>
          )}
          {count.icon && <Grid size={2}>{count.icon}</Grid>}
          <Grid size={"auto"}>
            <Typography
              variant={"body1"}
              sx={{
                fontWeight: "bold",
                color: count.primaryTextColor ? count.primaryTextColor : "#fff",
              }}
            >
              {count.title}
            </Typography>
            <Typography
              variant={"h4"}
              sx={{
                fontWeight: "bold",
              }}
              color={"primary"}
            >
              {data}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
