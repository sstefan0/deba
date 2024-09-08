import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { LatLng } from "leaflet";

type Inputs = {
  location: LatLng[]; // Stores the polyline coordinates
};

export default function RouteForm(props: any) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: props.data });
  const onSubmit: SubmitHandler<Inputs> = (data) => props.nextHandler(data);
  const [positions, setPositions] = useState<LatLng[]>(
    props.data ? props.data.location : []
  );

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const newPositions = [...positions, e.latlng];
        setPositions(newPositions);
        setValue("location", newPositions);
      },
    });

    return (
      <>
        {positions.length > 0 && (
          <>
            <Marker position={positions[0]} />
            <Polyline positions={positions} color="blue" />
          </>
        )}
      </>
    );
  }

  const undoLastPoint = () => {
    const newPositions = positions.slice(0, -1);
    setPositions(newPositions);
    setValue("location", newPositions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box
        sx={{ flexGrow: 1, width: "100%", padding: "1rem", cursor: "default" }}
      >
        <Typography
          variant="h4"
          textAlign={"left"}
          sx={{ padding: "0 0 5% 0" }}
        >
          <span
            style={{
              background: "gray",
              padding: "10px 20px",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              marginRight: "10px",
            }}
          >
            2
          </span>
          Ucrtavanje rute
        </Typography>
        <Grid container spacing={1} padding={"1rem"}>
          <Grid container xs={12}>
            <Grid xs={12}>
              <TextField
                sx={{ display: "none" }}
                {...register("location", { required: true })}
              />
              <Paper square={false} elevation={1} sx={{ width: "100%" }}>
                <MapContainer
                  center={[43.782416968212864, 19.288123754582692]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
                  {positions.length != 0 && (
                    <>
                      <Marker position={positions[0]} />
                      <Polyline positions={positions} color="blue" />
                    </>
                  )}
                </MapContainer>
              </Paper>
            </Grid>
          </Grid>
          {errors.location && <span>This field is required</span>}

          <Grid xs={6} container>
            <Grid xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={props.prevHandler} // Call the previous step handler
              >
                Nazad
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={undoLastPoint} // Call the undo last point function
                disabled={positions.length === 0} // Disable if there are no points
              >
                Poništi prethodnu tačku
              </Button>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Dalje
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
