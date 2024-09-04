import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MapChart from "../../components/mapChart/mapChart";
import "leaflet/dist/leaflet.css";
import ImagesList from "../../components/imagesList/imagesList";
import Divider from "@mui/material/Divider";
import YouTube from "react-youtube";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLoaderData } from "react-router-dom";

const SpotDetailsPage = () => {
  const loaderData: any = useLoaderData();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography
              variant="h3"
              align="left"
              // color={"#0E1C36"}
              width={"100%"}
              // bgcolor={"#47a7f565"}
            >
              {loaderData.name}
            </Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid xs={6}>
                <Typography
                  variant="subtitle1"
                  align="right"
                  // bgcolor={"red"}
                  width={"100%"}
                >
                  {loaderData.type.name}
                </Typography>
              </Grid>
              <Grid xs={3}>
                <Typography variant="subtitle1" align="left" width={"100%"}>
                  {loaderData.webSite && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        loaderData.webSite.startsWith("http://") ||
                        loaderData.webSite.startsWith("https://")
                          ? loaderData.webSite
                          : `https://${loaderData.webSite}`
                      }
                    >
                      Zvanični sajt
                    </a>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ bgcolor: loaderData.type.color, height: "2px" }} />
          </Grid>
          <Grid xs={12} sm={8}>
            <Paper elevation={1} square={false} sx={{ padding: "10px" }}>
              <Typography variant="body1" align="justify">
                {loaderData.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid container xs={12} sm={4} spacing={3}>
            <Grid xs={12}>
              <Paper square={false} elevation={1} sx={{ padding: "3%" }}>
                <Typography variant="h4" align="left">
                  Fotografije
                </Typography>
                <ImagesList images={loaderData.Image} />
              </Paper>
            </Grid>
            <Grid xs={12}>
              <Paper square={false} elevation={1} sx={{ padding: "3%" }}>
                <Typography variant="h4" align="left">
                  Video snimci
                </Typography>
                <Carousel
                  showStatus={false}
                  infiniteLoop={true}
                  showThumbs={false}
                >
                  {loaderData.VideoMaterials.map((video: any) => {
                    const videoId = (video.videoURL as string).split("?v=")[1];
                    return <YouTube key={video.id} videoId={videoId}></YouTube>;
                  })}
                </Carousel>
              </Paper>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <MapChart
              lat={loaderData.lat}
              lon={loaderData.lon}
              coordinates={loaderData.GeoCoordinates}
            />
          </Grid>
          <Grid xs={12} sm={3}></Grid>
          <Grid xs={12}></Grid>
        </Grid>
      </Box>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
    </>
  );
};

export default SpotDetailsPage;
