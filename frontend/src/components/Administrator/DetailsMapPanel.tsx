import React from "react";

// components and helpers
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

// mui
import Paper from "@mui/material/Paper";

import "leaflet/dist/leaflet.css";

const DetailsMapPanel: React.FC = () => {
  const position = [51.505, -0.09];

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
      </MapContainer>
    </Paper>
  );
};

export default DetailsMapPanel;
