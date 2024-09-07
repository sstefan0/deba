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
      {/* Image as background */}
      <Grid xs={12} style={{ height: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "100%", // Ensure the container takes full height of its parent
            overflow: "hidden", // Hide any overflowed content
          }}
        >
          <img
            src={props.article.imageUrl || "/novosti.jpg"}
            style={{
              width: "100%",
              //   height: "100%", // Make the image fill the container
              objectFit: "cover", // Cover the container while maintaining aspect ratio
              borderRadius: "10px",
            }}
            alt="slikica"
          />
        </div>
      </Grid>

      {/* Overlay Card */}

      <Box
        component={Paper}
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%", // Position at the center of the image height
          left: { xs: "50%", md: "20%" }, // Center the overlay horizontally
          transform: "translate(-50%, -50%)", // Adjust for centering the box
          width: { xs: "100%", md: "40%" }, // Ensure the width doesn't exceed the image
          //   maxWidth: "90%", // Also set a max-width constraint
          maxHeight: "100%", // Ensure the height doesn't overflow the image
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Make it slightly transparent
        }}
      >
        {/* News Title */}
        <Typography
          variant="h5"
          textAlign={"left"}
          fontWeight="bold"
          color="white"
        >
          {props.article.title}
        </Typography>

        {/* Date */}
        <Typography
          variant="subtitle2"
          color={"grey"}
          sx={{ display: "flex", alignItems: "center", gap: "5px", mt: 1 }}
        >
          <CalendarMonth />
          {new Date(props.article.createdAt).toLocaleDateString("en-UK")}
        </Typography>

        {/* Article Excerpt */}
        <Typography
          variant="body2"
          textAlign="left"
          sx={{ marginTop: "10px", fontSize: "14px", color: "white" }}
        >
          {props.article.description.substring(0, 100)}...
        </Typography>

        {/* Read More */}
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
