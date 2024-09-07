import { Box, Container, Paper, Typography } from "@mui/material";
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
    <Container
      maxWidth="xl"
      sx={{
        padding: { xs: "20px", sm: "30px", md: "50px" },
        bgcolor: "#121212",
        color: "#fff",
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          <div style={{ position: "relative" }}>
            <img
              src={
                loaderData.Image[0]
                  ? loaderData.Image[0].imageURL
                  : "/novosti.jpg"
              }
              alt="Background"
              style={{ width: "100%", display: "block", borderRadius: "25px" }}
            />
            <Paper
              elevation={1}
              square={false}
              sx={{
                padding: "3rem 4rem",
                borderRadius: "25px",
                // backgroundColor: "#fff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                position: "relative",
                top: "-100px", // Adjust this value as needed
                width: "calc(100% - 20px)", // Adjust based on padding
                margin: "0 auto", // Center align the Paper
                boxSizing: "border-box",
                zIndex: 1, // Ensure it sits above the image
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <Typography
                  variant="caption"
                  textAlign={"left"}
                  color={loaderData.type.color}
                >
                  {loaderData.type.name}
                </Typography>
              </div>
              <Typography
                variant="h3"
                align="left"
                width="100%"
                padding={"1rem"}
                sx={{ marginBottom: "10px" }}
              >
                {loaderData.name}
                <Divider
                  sx={{
                    bgcolor: loaderData.type.color,
                    height: "2px",
                    marginY: "10px",
                  }}
                />
              </Typography>
              <Typography variant="body1" align="justify">
                {loaderData.description}
              </Typography>
            </Paper>
          </div>
        </Grid>
        <Grid container xs={12} md={5} flexDirection={"column"}>
          <Grid xs={12}>
            <Paper
              square={false}
              elevation={1}
              sx={{ padding: "1rem", borderRadius: "25px" }}
            >
              <Typography variant="h4" align="left" mb={"10px"}>
                Fotografije
              </Typography>
              <ImagesList images={loaderData.Image} />
            </Paper>
          </Grid>
          {loaderData.VideoMaterials.length > 0 && (
            <Grid xs={12}>
              <Paper
                square={false}
                elevation={1}
                sx={{ padding: "1rem", borderRadius: "25px" }}
              >
                <Typography variant="h4" align="left" mb={"10px"}>
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
          )}
          <Grid xs={12}>
            <MapChart
              lat={loaderData.lat}
              lon={loaderData.lon}
              color={loaderData.type.color}
              coordinates={loaderData.GeoCoordinates}
            />
          </Grid>
        </Grid>
      </Grid>

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
    </Container>
  );
};

export default SpotDetailsPage;
