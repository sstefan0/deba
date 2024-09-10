import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Typography, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

const MainArticle = (props: any) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ position: "relative", justifyContent: "center" }}
    >
      <Grid xs={12} style={{ height: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={props.article.imageUrl || "/novosti.jpg"}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            alt="slikica"
          />
        </div>
      </Grid>

      <Box
        component={Paper}
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: "50%", md: "20%" },
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: "40%" },
          maxHeight: "100%",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Typography
          variant="h5"
          textAlign={"left"}
          fontWeight="bold"
          color="white"
        >
          {props.article.title}
        </Typography>

        <Typography
          variant="subtitle2"
          color={"grey"}
          sx={{ display: "flex", alignItems: "center", gap: "5px", mt: 1 }}
        >
          <CalendarMonth />
          {new Date(props.article.createdAt).toLocaleDateString("en-UK")}
        </Typography>

        <Typography
          variant="body2"
          textAlign="left"
          sx={{ marginTop: "10px", fontSize: "14px", color: "white" }}
        >
          {props.article.description.substring(0, 100)}...
        </Typography>

        <Link to={`/novost/${props.article.id}`}>
          <Typography
            variant="body2"
            textAlign="left"
            color="primary"
            sx={{ marginTop: "10px", cursor: "pointer", color: "lightblue" }}
          >
            Pročitaj više
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default MainArticle;
