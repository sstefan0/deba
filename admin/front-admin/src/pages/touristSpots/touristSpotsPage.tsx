import { useLoaderData, useNavigate } from "react-router-dom";
import callApi from "../../api/api";
import CustomizedTables from "../../components/tourismTable/tourismTable";
import SpotsCount from "../../components/spotsCount/spotsCount";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { getAuth } from "../../util/get-auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Backdrop, CircularProgress, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const TouristSpotsPage = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<any>({});
  const user = getAuth();
  useEffect(() => {
    if (!user) navigate("/login");
    else setAuthorized(true);
  }, [user]);
  useEffect(() => {
    const fetchStats = async () => {
      const response = await callApi.TouristSpots.getCounts();
      setStats(response);
    };
    fetchStats();
  }, []);
  const tableData = useLoaderData() as TouristSpotData[];
  return authorized ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={user === "ADMIN" ? 4 : 6}>
          <SpotsCount title={"Broj turističkih mjesta"} number={stats.spots} />
        </Grid>
        <Grid xs={12} sm={user === "ADMIN" ? 4 : 6}>
          <SpotsCount title="Broj novosti" number={stats.news} />
        </Grid>
        {user === "ADMIN" && (
          <Grid xs={12} sm={4}>
            <SpotsCount title="Broj korisničkih naloga" number={stats.users} />
          </Grid>
        )}

        <Grid xs={3} md={12} overflow={"scroll"} width={"100%"}>
          <CustomizedTables data={tableData} />
        </Grid>
      </Grid>
      <Link to={"/createSpot"}>
        <Fab
          variant="extended"
          sx={{ position: "fixed", bottom: "3%", right: "1%" }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Dodaj novu destinaciju
        </Fab>
      </Link>
    </Box>
  ) : (
    <Backdrop
      open
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export interface TouristSpotData {
  id: string;
  Ime: string;
  Tip: string;
  Dodao: string;
}

export const loader = async () => {
  try {
    const response = await callApi.TouristSpots.getAllTable();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default TouristSpotsPage;
