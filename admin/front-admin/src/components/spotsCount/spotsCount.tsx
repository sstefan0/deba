import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const SpotsCount = (props: any) => {
  return (
    <Paper elevation={3} square={false} sx={{ padding: "4%", width: "100%" }}>
      <Grid container spacing={0}>
        <Grid xs={12}>
          <Typography variant="subtitle1" align="left">
            {props.title}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h1" align="center">
            {props.number}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SpotsCount;
