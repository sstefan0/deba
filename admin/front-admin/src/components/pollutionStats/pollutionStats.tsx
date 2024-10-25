import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  useTheme,
  Paper,
} from "@mui/material";
import callApi from "../../api/api";

// Tip podataka za zagađivače
interface Pollutant {
  name: string;
  concentration: number;
  level1: number;
  level2: number;
  color: string; // Boja za prikaz trake
  maxConcentration: number; // Maksimalna vrednost za normalizaciju
}

// Podaci o zagađivačima

const PollutionStats = (props: any) => {
  const [pollutionData, setPollutionData] = useState<any>({});
  const [pollutants, setPollutants] = useState<Pollutant[]>([
    {
      name: "PM2.5",
      concentration: 29,
      level1: 25,
      level2: 50,
      color: "#fbc02d",
      maxConcentration: 100,
    },
    {
      name: "PM10",
      concentration: 40,
      level1: 50,
      level2: 100,
      color: "#8bc34a",
      maxConcentration: 200,
    },
    {
      name: "O3",
      concentration: 12,
      level1: 100,
      level2: 140,
      color: "#4caf50",
      maxConcentration: 200,
    },
    {
      name: "NO2",
      concentration: 22,
      level1: 70,
      level2: 150,
      color: "#4caf50",
      maxConcentration: 200,
    },
    {
      name: "SO2",
      concentration: 5,
      level1: 80,
      level2: 250,
      color: "#4caf50",
      maxConcentration: 350,
    },
    {
      name: "CO",
      concentration: 315.5,
      level1: 9400,
      level2: 12400,
      color: "#4caf50",
      maxConcentration: 15400,
    },
  ]);

  const getPollutantColor = (name: string): string => {
    switch (name) {
      case "PM2.5":
        return "#fbc02d"; // žuta
      case "PM10":
        return "#8bc34a"; // zelena
      case "O3":
        return "#4caf50"; // svetlo zelena
      case "NO2":
        return "#4caf50"; // svetlo zelena
      case "SO2":
        return "#4caf50"; // svetlo zelena
      case "CO":
        return "#4caf50"; // svetlo zelena
      default:
        return "#90a4ae"; // siva za nepoznate vrednosti
    }
  };
  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        console.log("u komponenti", props.pos);
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.pos.lat}&lon=${props.pos.lng}&appid=4a1b0fc22bca2ef6e15d17d36e974e12`
        ); // Zameni URL sa pravim API URL-om
        const data = await response.json();

        // Mapiranje podataka API-ja u format koji naša komponenta koristi
        console.log(data);
        pollutants[0].concentration = data.list[0].components.pm2_5;
        pollutants[1].concentration = data.list[0].components.pm10;
        pollutants[2].concentration = data.list[0].components.o3;
        pollutants[3].concentration = data.list[0].components.no2;
        pollutants[4].concentration = data.list[0].components.so2;
        pollutants[5].concentration = data.list[0].components.co;

        pollutants.forEach((pollutant) => {
          if (pollutant.concentration < pollutant.level1)
            pollutant.color = "#8bc34a";
          else if (
            pollutant.concentration >= pollutant.level1 &&
            pollutant.concentration <= pollutant.level2
          )
            pollutant.color = "#fbc02d";
          else pollutant.color = "tomato";
        });

        // const formattedData = data.map((item: any) => ({
        //   name: item.name,
        //   concentration: item.concentration,
        //   color: getPollutantColor(item.name),
        //   maxConcentration: item.name === "CO" ? 500 : 100, // Postavljamo max vrednost na 500 za CO, ostalo na 100
        // }));

        setPollutants(pollutants);
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchAirQualityData();
  }, [props.pos, pollutants]);
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        padding: "4%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {pollutants.map((pollutant, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ width: "10%", textAlign: "left" }}>
            {pollutant.name}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pollutant.concentration / pollutant.maxConcentration) * 100}
            sx={{
              width: "70%",
              height: 8,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[800],
              "& .MuiLinearProgress-bar": {
                backgroundColor: pollutant.color,
              },
            }}
          />
          <Typography variant="body1" sx={{ width: "20%", textAlign: "right" }}>
            {pollutant.concentration} µg/m³
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default PollutionStats;
