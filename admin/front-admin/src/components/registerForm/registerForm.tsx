import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const RegisterForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { ...props.data, password: "" } });

  const onSubmit: SubmitHandler<Inputs> = (data) => props.submitHandler(data);

  const userRole = useSelector((state: RootState) => state.user.role);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, width: "100%", padding: "1rem" }}>
        <Typography
          variant="h4"
          textAlign={"left"}
          sx={{ padding: "0 0 5% 0" }}
        >
          {props.data ? "Uređivanje naloga" : "Kreiranje naloga"}
        </Typography>
        <Grid container spacing={1} padding={"1rem"}>
          <Grid xs={12} container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                label="Ime"
                fullWidth
                error={Boolean(errors.firstName)}
                helperText={errors.firstName ? "Ovo polje je obavezno" : ""}
                {...register("firstName", { required: true })}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Prezime"
                fullWidth
                error={Boolean(errors.lastName)}
                helperText={errors.lastName ? "Ovo polje je obavezno" : ""}
                {...register("lastName", { required: true })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} xs={12}>
            <Grid xs={12} justifyContent={"flex-start"}>
              <TextField
                label="Email"
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email ? "Ovo polje je obavezno" : ""}
                fullWidth
                {...register("email", { required: true })}
              />
            </Grid>
            <Grid xs={12} justifyContent={"flex-start"}>
              <TextField
                label="Lozinka"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password ? "Ovo polje je obavezno" : ""}
                fullWidth
                {...register("password", { required: !props.data })}
              />
            </Grid>
            <Grid xs={12} justifyContent={"flex-start"}>
              <TextField
                label="Tip"
                select
                fullWidth
                disabled={props.data && userRole === "USER"}
                defaultValue={props.data ? props.data.role : ""}
                error={Boolean(errors.role)}
                helperText={errors.role ? "Ovo polje je obavezno" : ""}
                {...register("role", { required: true })}
              >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"USER"}>KORISNIK</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Potvrdi
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default RegisterForm;
