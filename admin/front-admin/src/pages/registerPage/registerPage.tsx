import {
  Backdrop,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import callApi from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/registerForm/registerForm";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data: any) => {
    try {
      setIsLoading(true);
      const newAccount = await callApi.Auth.register(data);

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/dashboard/korisnickiNalozi");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
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
              Nalog uspješno kreiran.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "white", color: "black" }}
              onClick={handleContinue}
            >
              Nastavi
            </Button>
          </Box>
        )}
      </Backdrop>
      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        }}
      >
        <RegisterForm submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default RegisterPage;
