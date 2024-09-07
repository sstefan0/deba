import {
  Button,
  Typography,
  Box,
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  Avatar,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import callApi from "../../api/api";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import "./presentationPage.css";

const PresentationPage = () => {
  const data: any = useLoaderData();
  const isMobile = useIsMobile();
  const [typeIcons, setTypeIcons] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [center, setCenter] = useState<LatLngExpression>([
    43.78397533223712, 19.29362293065251,
  ]);
  const [zoom, setZoom] = useState(15);
  const iconsList = [
    <ForestOutlinedIcon />,
    <AccountBalanceOutlinedIcon />,
    <RestaurantOutlinedIcon />,
    <DirectionsBikeOutlinedIcon />,
    <HikingOutlinedIcon />,
  ];
  console.log(data);
  useEffect(() => {
    const fetchTypes = async () => {
      const types = await callApi.TouristSpots.getTypes();
      setTypes(types);
      const iconMap = types.reduce((acc: any, type: any) => {
        acc[type.name] = type.iconURL;
        return acc;
      }, {});
      setTypeIcons(iconMap);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const recommendations = await callApi.TouristSpots.getRecommendations();
      setRecommendations(recommendations);
    };
    fetchRecommendations();
  }, []);

  const actions = types.map((type: any, index: number) => ({
    ...type,
    icon: iconsList[index],
  }));

  return (
    <div style={{ position: "relative" }}>
      {/* The map container */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        zoomControl={false}
        style={{ height: "90vh", width: "100%", zIndex: "0" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} zoom={zoom} />

        {data.map(
          (spot: any) =>
            spot.type === selectedType && (
              <CustomMarker
                key={spot.id}
                spot={spot}
                iconUrl={typeIcons[spot.type]}
                setCenter={setCenter} // Pass function to set the map center
              />
            )
        )}
      </MapContainer>

      {/* Example of overlay elements */}
      <div
        className="categories-div"
        style={{
          position: "absolute",
          top: "0%",
          height: "100%",
          left: "0",
          zIndex: 1000,
          display: isMobile && selectedType !== "" ? "none" : "flex",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.65), rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0,0,0,0))",
          backgroundSize: "cover",
          padding: "10px",
          // display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {selectedType === "" ? (
          <>
            <Typography variant="h5">Dobrodošli u</Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              Višegrad
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Istražite našu bogatu turističku ponudu izborom kategorije
            </Typography>

            {types.map((type: any) => (
              <Button
                key={type.id}
                variant="text"
                sx={{
                  color: type.color,
                  fontWeight: "bold",
                  "&:focus": { outline: "none !important" },
                }}
                onClick={() => {
                  setSelectedType(type.name), console.log("centaaar");
                  setCenter([
                    recommendations[type.name].lat,
                    recommendations[type.name].lon,
                  ]);
                  console.log(recommendations[type.name]);
                  setZoom(16);
                }}
              >
                {type.name}
              </Button>
            ))}
          </>
        ) : (
          !isMobile && (
            <>
              <img
                src={recommendations[selectedType].Image[0].imageURL}
                style={{
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: "15px",
                  border: "1px solid white",
                }}
              ></img>
              <Typography variant="h5">Preporuka</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                {recommendations[selectedType].name}
              </Typography>
              {/* <img
              src={recommendations[selectedType].Image[0].imageURL}
              alt="slikica"
              ></img> */}
              <Typography variant="body1" sx={{ mb: 4 }}>
                {recommendations[selectedType].description.substring(0, 300)}...
              </Typography>
              <Link
                to={`/view/${recommendations[selectedType].id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button sx={{ color: "white", "&:focus": { outline: "none" } }}>
                  Prikaži više
                </Button>
              </Link>
            </>
          )
        )}
      </div>

      {selectedType !== "" && (
        <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<FilterAltOutlinedIcon />}
            onClose={handleClose}
            onClick={handleOpen}
            open={open}
          >
            {actions.map((action: any) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => {
                  setSelectedType(action.name), console.log("centaaar");
                  setCenter([
                    recommendations[action.name].lat,
                    recommendations[action.name].lon,
                  ]);
                  setZoom(16);
                }}
                sx={{
                  background:
                    selectedType === action.name ? action.color : "black",
                  "&:focus": { outline: "none !important" },
                }}
              />
            ))}
          </SpeedDial>
        </Box>
      )}
    </div>
  );
};
function ChangeView({ center, zoom }: { center: LatLngExpression; zoom: any }) {
  const map = useMap();

  useEffect(() => {
    console.log(center);

    map.flyTo(center, zoom, { duration: 0.5 });
  }, [center, zoom, map]);

  return null;
}

function CustomMarker({ spot, iconUrl, setCenter }: any) {
  const map = useMap();

  const handleMarkerClick = () => {
    // Set the center of the map to the marker's position
    map.flyTo([spot.lat, spot.lon], 15, {
      duration: 1.5, // Duration of the fly animation (optional)
    });
    setCenter([spot.lat, spot.lon]); // Update center state (optional)
  };

  return (
    <Marker
      position={[spot.lat, spot.lon]}
      icon={L.icon({
        iconUrl: iconUrl,
        iconSize: [60, 60],
        popupAnchor: [-3, -30],
      })}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Popup closeButton={false} className="custom-popup">
        <div style={{ width: "100%", padding: "30px" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Avatar
              src={spot.image}
              sx={{ width: "30%", height: "auto" }}
            ></Avatar>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {spot.name}
            </Typography>
          </div>
          <Typography variant="body2">
            {spot.description.substring(0, 100)}...
          </Typography>
          <Link
            to={`/view/${spot.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="text"
              sx={{ color: "white", "&:focus": { outline: "none" } }}
            >
              Još informacija
              <InfoIcon sx={{ color: "white" }} />
            </Button>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default PresentationPage;
