import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "leaflet/dist/leaflet.css";
import ImagesList from "../../components/imagesList/imagesList";
import Divider from "@mui/material/Divider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLoaderData } from "react-router-dom";

const ArticlePage = () => {
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
              {loaderData.title}
            </Typography>

            <Divider sx={{ bgcolor: "pink", height: "2px" }} />
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
          </Grid>

          <Grid xs={12} sm={3}></Grid>
          <Grid xs={12}></Grid>
        </Grid>
      </Box>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
    </>
  );
};

export default ArticlePage;
