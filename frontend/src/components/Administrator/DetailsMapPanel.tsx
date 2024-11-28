import React, { useEffect } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

// components and helpers
import locationIcon from "../../assets/images/location-sign.svg";

// mui
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

interface DetailsMapPanelProps {
  details?: any;
}

const DetailsMapPanel: React.FC<DetailsMapPanelProps> = ({ details }) => {
  const [locations, setLocations] = React.useState<any[]>([]);
  // @ts-ignore
  const [position, setPosition] = React.useState<any[]>(null);
  const [currentActivity, setCurrentActivity] = React.useState<any>({});

  useEffect(() => {
    if (details?.activities?.length > 0) {
      getLatestActivity(details);
      const locationsList: [number, number][] = [];
      const geoLocations = details.activities
        .filter(
          (activity: {
            geoLocation?: { latitude: number; longitude: number };
          }) => activity.geoLocation,
        )
        .map(
          (activity: {
            geoLocation: { latitude: number; longitude: number };
          }) => activity.geoLocation,
        );

      if (geoLocations.length === 0) {
        setPosition([33.749, -84.388]);
        return;
      }
      geoLocations.forEach(
        (location: { latitude: number; longitude: number }) =>
          locationsList.push([location.latitude, location.longitude]),
      );
      setLocations(locationsList);
      setPosition(locationsList[locationsList.length - 1]);
    }
  }, [details]);

  const getLatestActivity = (data: { activities: any[] }) => {
    if (!data.activities || data.activities.length === 0) {
      return null; // No activities available
    }

    // Use reduce to find the latest activity
    const value = data.activities.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });

    setCurrentActivity(value);
  };

  const customIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  if (!position) return null;
  return (
    <Paper sx={{ p: 2 }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: 425 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations &&
          locations.length &&
          locations.map((position: LatLngExpression, idx: number) => (
            <Marker key={`marker-${idx}`} position={position} icon={customIcon}>
              <Popup>
                <Grid container>
                  <Grid size={12}>
                    <Typography variant="h6">
                      {currentActivity && currentActivity.status}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body2">
                      {currentActivity && currentActivity.location}
                    </Typography>
                  </Grid>
                </Grid>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </Paper>
  );
};

export default DetailsMapPanel;
