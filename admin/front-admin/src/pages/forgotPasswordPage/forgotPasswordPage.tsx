import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  CssBaseline,
  Card,
  CardContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import callApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../util/get-auth";
import CheckIcon from "@mui/icons-material/Check";

const BackgroundContainer = styled(Container)({
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledCard = styled(Card)({
  maxWidth: 400,
  width: "100%",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  boxSizing: "border-box",
});

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const user = getAuth();
  useEffect(() => {
    if (user) navigate("/dashboard/turistickaMjesta");
  }, [user]);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await callApi.Auth.forgotPassword({ email });
      if (response) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (e) {
      setError("Pogrešan email ili lozinka");
      setIsLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: isSuccess
            ? "rgba(46, 125, 50, 0.95)"
            : "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isLoading || isSuccess}
      >
        {!isSuccess && isLoading && <CircularProgress />}
        {isSuccess && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <CheckIcon style={{ fontSize: 60, color: "white" }} />
            <Typography
              variant="h6"
              sx={{ color: "white", marginTop: "16px", fontWeight: "bold" }}
            >
              Instrukcije za promjenu lozinke su poslate na email adresu.
            </Typography>
          </Box>
        )}
      </Backdrop>
      <CssBaseline />
      <StyledCard>
        <CardContent>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Zaboravljena lozinka
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Potvrdi
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default ForgotPasswordPage;
