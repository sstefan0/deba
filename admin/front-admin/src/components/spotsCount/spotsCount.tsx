import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

const SpotsCount = (props: any) => {
  const [bgColor, setBgColor] = useState("");
  const [pollutionTitle, setPollutionTitle] = useState("");

  useEffect(() => {
    console.log("evo radim ovo");
    console.log(props.title);
    if (props.title !== "Indeks zagađenosti") {
      console.log("nista");
      setBgColor("");
    } else {
      console.log("nesto");
      switch (props.number) {
        case 1:
          setBgColor("green");
          setPollutionTitle("Dobar");
          break;
        case 2:
          setBgColor("yellow");
          setPollutionTitle("Prihvatljiv");
          break;
        case 3:
          setBgColor("orange");
          setPollutionTitle("Umjereno zagađen");
          break;
        case 4:
          setBgColor("red");
          setPollutionTitle("Nezdrav za osjetljive grupe");
          break;
        case 5:
          setBgColor("purple");
          setPollutionTitle("Nezdrav za sve");
          break;
        case 6:
          setBgColor("darkred");
          setPollutionTitle("Opasan");
          break;
      }
    }
  }, [props.title, props.number]);
  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        padding: "4%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        WebkitAlignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        border:
          props.title === "Indeks zagađenosti" ? `2px solid ${bgColor}` : "",
      }}
    >
      <Grid
        container
        spacing={0}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid xs={12}>
          <Typography variant="subtitle1" align="left">
            {props.title}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h2" align="center">
            {props.number}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SpotsCount;
