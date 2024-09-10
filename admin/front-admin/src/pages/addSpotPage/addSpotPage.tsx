import { useState, useRef, useEffect } from "react";
import SpotForm from "../../components/spotForm/spotForm";
import RouteForm from "../../components/routeForm/routeForm";
import MediaForm from "../../components/mediaForm/mediaForm";
import callApi from "../../api/api";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { getAuth } from "../../util/get-auth";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

const AddSpotPage = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>([]);
  const [routeEnabled, setRouteEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const user = getAuth();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const spotFormRef = useRef<HTMLDivElement>(null);
  const routeFormRef = useRef<HTMLDivElement>(null);
  const mediaFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentType = data[0]?.type || "";
    const shouldEnableRoute =
      currentType === "0f0d44c1-ac95-454a-a5c5-58d2c7ab6314" ||
      currentType === "3cc0f693-de40-4362-911c-9a4e675b1cce";

    setRouteEnabled(shouldEnableRoute);
  }, [data[0]?.type]);

  useEffect(() => {
    if (!routeEnabled && step === 2) {
      setStep(3);
    } else if (routeEnabled && step === 3) {
      setStep(2);
    }
  }, [routeEnabled]);

  useEffect(() => {
    switch (step) {
      case 1:
        spotFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case 2:
        routeFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      case 3:
        mediaFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      default:
        break;
    }
  }, [step]);

  const nextStep = (formData: any) => {
    setData((prevData: any) => {
      const newData = [...prevData];
      newData[step - 1] = formData;
      return newData;
    });

    if (step === 1 && !routeEnabled) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const submit = async (formData: any) => {
    try {
      setIsLoading(true);
      const formattedData = {
        name: data[0].name,
        description: data[0].description,
        potentialTypeId: data[0].type,
        webSite: data[0].website,
        lat: data[0].location.lat,
        lon: data[0].location.lng,
      };
      const newSpot = await callApi.TouristSpots.createSpot(formattedData);

      if (routeEnabled) {
        const reqBody = {
          tourismPotentialId: newSpot.id,
          coordinates: data[1].location.map((coordinates: any) => {
            return { lat: coordinates.lat, lon: coordinates.lng };
          }),
        };
        await callApi.TouristSpots.addPath(reqBody);
      }
      if (formData.videoUrls.length > 0) {
        const reqBody = {
          tourismPotentialId: newSpot.id,
          videos: formData.videoUrls.map((videoUrl: any) => {
            return videoUrl.url;
          }),
        };
        await callApi.TouristSpots.addVideos(reqBody);
      }
      const imagesData = new FormData();
      const otherData = new FormData();
      Array.from(formData.image).forEach((img: any) => {
        if (img.type.startsWith("image/")) imagesData.append("images", img);
        else if (img.type === "application/pdf") otherData.append("docs", img);
      });
      imagesData.append("tourismPotentialId", newSpot.id);
      otherData.append("tourismPotentialId", newSpot.id);
      const promises: any[] = [];

      if (imagesData.has("images"))
        promises.push(callApi.Upload.uploadImages(imagesData));
      if (otherData.has("docs"))
        promises.push(callApi.Upload.uploadFiles(otherData));

      await Promise.all(promises);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const prevStep = () => {
    if (step === 3 && !routeEnabled) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };
  const handleContinue = () => {
    navigate("/dashboard/turistickaMjesta");
  };
  const isStepCompleted = (stepIndex: number) => data[stepIndex] != null;

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
              Destinacija uspješno uređena.
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
        ref={spotFormRef}
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          opacity: step === 1 ? 1 : 0.5,
          transform: step === 1 ? "scale(1)" : "scale(0.95)",
        }}
      >
        {step === 1 ? (
          <SpotForm nextHandler={nextStep} data={data[step - 1]} />
        ) : (
          <Typography variant="h4" textAlign={"left"} sx={{ padding: "1%" }}>
            <span
              style={{
                backgroundColor: isStepCompleted(0) ? "lightgreen" : "gray",
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
        )}
      </div>
      {
        <div
          ref={routeFormRef}
          style={{
            margin: "20px 0",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            opacity: routeEnabled ? (step === 2 ? 1 : 0.5) : 0.3,
            transform: routeEnabled
              ? step === 2
                ? "scale(1)"
                : "scale(0.95)"
              : "scale(0.9)",
            cursor: routeEnabled ? "pointer" : "not-allowed",
            pointerEvents: routeEnabled ? "auto" : "none",
          }}
        >
          {step === 2 ? (
            <RouteForm
              nextHandler={nextStep}
              prevHandler={prevStep}
              data={data[step - 1]}
            />
          ) : routeEnabled ? (
            <Typography variant="h4" textAlign={"left"} sx={{ padding: "1%" }}>
              <span
                style={{
                  backgroundColor: routeEnabled
                    ? isStepCompleted(1)
                      ? "lightgreen"
                      : "gray"
                    : "gray",
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
          ) : (
            <Typography variant="h4" textAlign={"left"} sx={{ padding: "1%" }}>
              <span
                style={{
                  backgroundColor: routeEnabled
                    ? isStepCompleted(1)
                      ? "lightgreen"
                      : "gray"
                    : "gray",
                  padding: "10px 20px",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
              >
                <BlockIcon sx={{ color: "red" }} />
              </span>
              Ucrtavanje rute
            </Typography>
          )}
        </div>
      }
      <div
        ref={mediaFormRef}
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          opacity: step === 3 ? 1 : 0.5,
          transform: step === 3 ? "scale(1)" : "scale(0.95)",
        }}
      >
        {step === 3 ? (
          <MediaForm prevHandler={prevStep} submitHandler={submit} />
        ) : (
          <Typography variant="h4" textAlign={"left"} sx={{ padding: "1%" }}>
            <span
              style={{
                backgroundColor: isStepCompleted(2) ? "lightgreen" : "gray",
                padding: "10px 20px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                marginRight: "10px",
              }}
            >
              3
            </span>
            Fotografije, PDF i video snimci
          </Typography>
        )}
      </div>
    </div>
  );
};

export default AddSpotPage;
