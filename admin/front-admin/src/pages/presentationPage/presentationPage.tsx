import {
  Button,
  Typography,
  Box,
  SpeedDial,
  SpeedDialAction,
  Avatar,
  IconButton,
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
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";

const PresentationPage = () => {
  const data: any = useLoaderData();
  const isMobile = useIsMobile();
  const [typeIcons, setTypeIcons] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [center, setCenter] = useState<LatLngExpression>([
    43.78397533223712, 19.29362293065251,
  ]);
  const [recommendationsVisible, setRecommendationsVisible] = useState(true);
  const [zoom, setZoom] = useState(15);
  const iconsList = [
    <ForestOutlinedIcon />,
    <AccountBalanceOutlinedIcon />,
    <RestaurantOutlinedIcon />,
    <DirectionsBikeOutlinedIcon />,
    <HikingOutlinedIcon />,
  ];

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
                setCenter={setCenter}
              />
            )
        )}
      </MapContainer>

      <IconButton
        sx={{
          position: "absolute",
          top: "1%",
          left: "0.5%",
          display: selectedType === "" ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          padding: "8px",
          transition: "background-color 0.3s, box-shadow 0.3s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
          },
          "&:focus": {
            outline: "none",
          },
          zIndex: "10001",
        }}
        onClick={() => {
          setRecommendationsVisible(!recommendationsVisible);
        }}
      >
        {recommendationsVisible ? <ChevronLeftIcon /> : <ChevronRight />}
      </IconButton>

      <div
        className="categories-div"
        style={{
          position: "absolute",
          top: "0",
          height: "100%",
          left: "0",
          zIndex: 1000,
          display: "flex",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.65), rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0,0,0,0))",
          backgroundSize: "cover",
          padding: "10px",
          flexDirection: "column",
          justifyContent: "center",
          transform: recommendationsVisible
            ? "translateX(0)"
            : "translateX(-110%)",
          transition: "transform 0.5s ease-in-out",
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
                variant="outlined"
                sx={{
                  color: type.color,
                  background: "rgba(0,0,0,0.25)",
                  mb: "5px",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  border: "none",
                  "&:focus": { outline: "none !important" },
                  "&:hover": { outline: "none", border: "none" },
                }}
                onClick={() => {
                  setSelectedType(type.name);
                  setCenter([
                    recommendations[type.name].lat,
                    recommendations[type.name].lon,
                  ]);
                  setZoom(16);
                  if (isMobile) setRecommendationsVisible(false);
                }}
              >
                {type.name}
              </Button>
            ))}
          </>
        ) : (
          <>
            <Typography variant="h6" textAlign={"center"}>
              Preporuka
            </Typography>
            <img
              src={recommendations[selectedType].Image[0].imageURL}
              style={{
                width: "80%",
                alignSelf: "center",
                borderRadius: "15px",
                border: "1px solid white",
              }}
              referrerPolicy="no-referrer"
            ></img>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              {recommendations[selectedType].name}
            </Typography>

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
        )}
      </div>

      {selectedType !== "" && (
        <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={open ? <CloseIcon /> : <FilterAltOutlinedIcon />}
            onClick={handleOpen}
            open={open}
          >
            {actions.map((action: any) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedType(action.name);
                  setCenter([
                    recommendations[action.name].lat,
                    recommendations[action.name].lon,
                  ]);
                  setZoom(16);

                  if (!isMobile) setRecommendationsVisible(true);

                  setOpen(true);
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
    map.flyTo(center, zoom, { duration: 0.5 });
  }, [center, zoom, map]);

  return null;
}

function CustomMarker({ spot, iconUrl, setCenter }: any) {
  const map = useMap();

  const handleMarkerClick = () => {
    map.flyTo([spot.lat, spot.lon], 15, {
      duration: 1.5,
    });
    setCenter([spot.lat, spot.lon]);
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
