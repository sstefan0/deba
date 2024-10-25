import { useLoaderData, useNavigate } from "react-router-dom";
import callApi from "../../api/api";
import CustomizedTables from "../../components/newsTable/newsTable";
import SpotsCount from "../../components/spotsCount/spotsCount";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { getAuth } from "../../util/get-auth";
import { ChangeEvent, useEffect, useState } from "react";
import { Backdrop, CircularProgress, Fab, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import LeafletMap from "../../components/mapChart/mapChart";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import PollutionStats from "../../components/pollutionStats/pollutionStats";
import { LatLng } from "leaflet";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const AnalyticsPage = () => {
  const navigate = useNavigate();
  const user = getAuth();
  const [position, setPosition] = useState<LatLng | null>(
    new LatLng(43.85903215130383, 18.421933896622665)
  );
  const [newsCount, setNewsCount] = useState(0);
  const [aqi, setAqi] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<any>({});
  const [temp, setTemp] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    else setAuthorized(true);
  }, [user]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        console.log(position);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  }
  const fetchAirData = async (lat: number, lon: number) => {
    console.log(lat, lon);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4a1b0fc22bca2ef6e15d17d36e974e12`
    ); // Zameni URL sa pravim API URL-om
    const data = await response.json();

    setAqi(data.list[0].main.aqi);
  };

  socket.on("temperature", (data) => {
    setTemp(data);
  });
  useEffect(() => {
    fetchAirData(position?.lat as number, position?.lng as number);
  }, [position]);

  const tableData = useLoaderData() as any;
  useEffect(() => {
    const fetchStats = async () => {
      const response = await callApi.TouristSpots.getCounts();
      setStats(response);
    };
    fetchStats();
  }, []);
  return authorized ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <SpotsCount title={"Temperatura vazduha"} number={temp} />
          </Grid>
          <Grid xs={12} sm={6}>
            <PollutionStats pos={position} />
          </Grid>
          <Grid xs={12} sm={3}>
            <SpotsCount title="Indeks zagađenosti" number={aqi} />
          </Grid>
          <Grid xs={3} md={12} overflow={"scroll"} width={"100%"}>
            <MapContainer
              center={[43.858923847317946, 18.421901710116117]}
              zoom={16}
              scrollWheelZoom
              zoomControl={false}
              style={{ height: "60vh", width: "100%", zIndex: "0" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <ChangeView center={center} zoom={zoom} /> */}
              <LocationMarker />
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
      <Link to={"../dodajNovost"}>
        <Fab
          variant="extended"
          sx={{ position: "fixed", bottom: "3%", right: "1%" }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Dodaj Novost
        </Fab>
      </Link>
    </>
  ) : (
    <Backdrop
      open
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AnalyticsPage;
