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
import { MapContainer, TileLayer } from "react-leaflet";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const user = getAuth();
  const [newsCount, setNewsCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<any>({});
  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    navigate(`/dashboard/novosti/${value}`);
  };
  useEffect(() => {
    if (!user) navigate("/login");
    else setAuthorized(true);
  }, [user]);
  const fetchCount = async () => {
    const count = await callApi.News.getCount();
    setNewsCount(count);
  };
  useEffect(() => {
    fetchCount();
  }, []);
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
          <Grid xs={12} sm={user === "ADMIN" ? 4 : 6}>
            <SpotsCount title={"Temperatura vazduha"} number={stats.spots} />
          </Grid>
          <Grid xs={12} sm={user === "ADMIN" ? 4 : 6}>
            <SpotsCount title="Vlažnost vazduha" number={stats.news} />
          </Grid>
          <Grid xs={12} sm={4}>
            <SpotsCount title="Indeks zagađenosti" number={stats.users} />
          </Grid>
          <Grid xs={3} md={12} overflow={"scroll"} width={"100%"}>
            <MapContainer
              center={[43.858923847317946, 18.421901710116117]}
              zoom={16}
              scrollWheelZoom
              zoomControl={false}
              style={{ height: "90vh", width: "100%", zIndex: "0" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <ChangeView center={center} zoom={zoom} /> */}
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