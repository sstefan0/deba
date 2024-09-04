import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Paper } from "@mui/material";

function LeafletMap(props: any) {
  const koordinatePrave = props.coordinates.map((coordinates: any) => ({
    lat: coordinates.lat,
    lon: coordinates.lon,
  }));

  return (
    <Paper square={false} elevation={1} sx={{ padding: "5px" }}>
      <MapContainer
        center={[props.lat, props.lon]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.lat, props.lon]}></Marker>
        {props.coordinates.length > 0 && (
          <Polyline positions={koordinatePrave} color="blue"></Polyline>
        )}
      </MapContainer>
    </Paper>
  );
}

export default LeafletMap;
