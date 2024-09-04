import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Fragment, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useLoaderData } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import callApi from "../../api/api";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const PresentationPage = () => {
  const data: any = useLoaderData();
  const [news, setNews] = useState<any>([]);
  const [typeIcons, setTypeIcons] = useState<any>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const fetchedArticles = await callApi.News.getNews(1, 5);

      setNews(fetchedArticles);
    };
    fetchNews();
  }, []);
  useEffect(() => {
    const fetchTypes = async () => {
      const types = await callApi.TouristSpots.getTypes();
      const iconMap = types.reduce((acc: any, type: any) => {
        acc[type.name] = type.iconURL;
        return acc;
      }, {});
      setTypeIcons(iconMap);
    };
    fetchTypes();
  }, []);

  useEffect(() => {}, [typeIcons]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Paper square={false} elevation={1} sx={{ padding: "5px" }}>
            <MapContainer
              center={[43.78397533223712, 19.29362293065251]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "700px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data.map((spot: any) => {
                return (
                  Object.keys(typeIcons).length > 0 && (
                    <Marker
                      position={[spot.lat, spot.lon]}
                      key={spot.id}
                      icon={L.icon({
                        iconUrl: typeIcons[spot.type],
                        iconSize: [60, 60],
                        popupAnchor: [-3, -30],
                      })}
                    >
                      <Popup closeButton={false}>
                        <Typography variant="h6">{spot.name}</Typography>
                        <Typography variant="body2">{spot.type}</Typography>
                        <Link to={`/view/${spot.id}`}>
                          <Button variant="contained">
                            Još informacija
                            <InfoIcon sx={{ color: "black" }} />
                          </Button>
                        </Link>
                      </Popup>
                    </Marker>
                  )
                );
              })}
            </MapContainer>
          </Paper>
        </Grid>
        <Grid xs={12} md={3}>
          <Paper square={false} elevation={1} sx={{ padding: "3%" }}>
            <Typography
              variant="h5"
              gutterBottom
              textAlign="left"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <NewspaperIcon
                sx={{ fontSize: "inherit", marginRight: "15px" }}
              />
              Novosti
            </Typography>
            <Divider
              sx={{ bgcolor: "gray", borderRadius: "50%", height: "3px" }}
            />
            {news && (
              <List>
                {news.map((article: any) => (
                  <Fragment key={article.id}>
                    <Link
                      to={`/novost/${article.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                variant="h6"
                                component="span"
                                color="rgba(216, 215, 215, 0.8)"
                                fontWeight={"bold"}
                              >
                                {article.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="span"
                                color="textSecondary"
                              ></Typography>
                            </>
                          }
                          secondary={
                            <>
                              <br />
                              <Typography
                                component="span"
                                variant="caption"
                                color="textSecondary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <CalendarMonthIcon
                                  sx={{ fontSize: "inherit" }}
                                />
                                {new Date(
                                  article.createdAt
                                ).toLocaleDateString()}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            )}
            <Link to={"/sveNovosti/1"}>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                fullWidth
              >
                Pogledaj više
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PresentationPage;
