import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import callApi from "../../api/api";

type Inputs = {
  location: string;
  name: string;
  type: string;
  website: string;
  description: string;
};

export default function SpotForm(props: any) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors },
  } = useForm<Inputs>({ defaultValues: props.data });
  const onSubmit: SubmitHandler<Inputs> = (data) => props.nextHandler(data);
  const [position, setPosition] = useState<LatLng | null>(null);
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setValue("location", e.latlng);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  }
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTypes() {
      const fetchedTypes = await callApi.TouristSpots.getTypes();
      setTypes(fetchedTypes);
    }
    fetchTypes();
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
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
            1
          </span>
          Osnovne informacije
        </Typography>
        <Grid container spacing={1}>
          <Grid xs={3} container spacing={3}>
            <Grid xs={12}>
              <TextField
                label="Naziv"
                fullWidth
                {...register("name", { required: true })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Tip"
                select
                fullWidth
                defaultValue={props.data ? props.data.type : ""}
                {...register("type", { required: true })}
              >
                {types.map((type: any) => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Veb sajt"
                fullWidth
                {...register("website", { required: false })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} xs={5}>
            <Grid xs={12}>
              <TextField
                label="Opis"
                fullWidth
                multiline
                minRows={8}
                maxRows={10}
                {...register("description", { required: true })}
              />
            </Grid>
          </Grid>
          <Grid container xs={4}>
            <Grid xs={12}>
              <TextField
                sx={{ display: "none" }}
                {...register("location", { required: true })}
              />
              <Paper square={false} elevation={1} sx={{ width: "100%" }}>
                <MapContainer
                  center={
                    getValues("location")
                      ? (getValues("location") as unknown as LatLng)
                      : [43.782416968212864, 19.288123754582692]
                  }
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "200px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker></LocationMarker>
                  {getValues("location") && (
                    <Marker
                      position={getValues("location") as unknown as LatLng}
                    ></Marker>
                  )}
                </MapContainer>
              </Paper>
            </Grid>
          </Grid>
          {errors.location && <span>This field is required</span>}
          <Grid xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Dalje
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
