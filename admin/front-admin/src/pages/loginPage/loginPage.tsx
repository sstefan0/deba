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
} from "@mui/material";
import { styled } from "@mui/system";
import callApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../util/get-auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/user-slice";
import { Link } from "react-router-dom";

const BackgroundContainer = styled(Container)({
  backgroundImage: "url(https://source.unsplash.com/random)",
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getAuth();
  useEffect(() => {
    if (user) navigate("/dashboard/turistickaMjesta");
  }, [user]);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      if (!email || !password) {
        setError("Unesite email i lozinku");
        return;
      }
      const response = await callApi.Auth.login({ email, password });
      if (response) {
        const accessToken = response.accessToken;
        localStorage.setItem("accessToken", accessToken);
        dispatch(login({ accessToken }));
      }

      navigate("/dashboard/turistickaMjesta");
    } catch (e) {
      setError("Pogrešan email ili lozinka");
    }
  };

  return (
    <BackgroundContainer>
      <CssBaseline />
      <StyledCard>
        <CardContent>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Dobrodošli
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={"/forgotPassword"}>
              <Typography variant="body2" textAlign={"left"}>
                Zaboravili ste lozinku?
              </Typography>
            </Link>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prijava
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default Login;
