import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  keyframes,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const sections = [
  {
    title: "Otkrijte Višegrad",
    subtitle: "ISTORIJSKI GRAD NA DRINI",
    description: `Višegrad je grad poznat po svojoj bogatoj istoriji i kulturnom nasleđu. Smešten na obalama reke Drine, nudi jedinstven spoj prirodnih lepota i istorijskih znamenitosti. Posetioci mogu uživati u šetnjama pored reke, istraživanju lokalnih muzeja i uživanju u autentičnoj bosanskoj kuhinji.`,
    bgImage:
      "url(https://images.pexels.com/photos/12039781/pexels-photo-12039781.jpeg)", // Zamenite sa pravim URL-om slike
  },
  {
    title: "Most Mehmed Paše Sokolovića",
    subtitle: "UNESCO SPOMENIK KULTURE",
    description: `Ovaj veličanstveni most iz 16. veka predstavlja remek-delo osmanske arhitekture. Most Mehmed Paše Sokolovića, delo čuvenog graditelja Mimara Sinana, danas je pod zaštitom UNESCO-a. Preko reke Drine, most povezuje ne samo dve obale već i bogatu istoriju Višegrada sa svetom.`,
    bgImage:
      "url(https://images.pexels.com/photos/20305455/pexels-photo-20305455/free-photo-of-mehmed-pasa-sokolovic-bridge-in-visegrad-bosnia-and-herzegovina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)", // Zamenite sa pravim URL-om slike
  },
  {
    title: "Andrićgrad",
    subtitle: "GRAD OD KAMENA POSVEĆEN IVO ANDRIĆU",
    description: `Andrićgrad je kulturni, obrazovni, i turistički kompleks inspirisan delima Ive Andrića, dobitnika Nobelove nagrade za književnost. Grad od kamena simbolizuje bogato kulturno nasleđe Višegrada i Balkana, sa mešavinom arhitektonskih stilova iz različitih perioda istorije.`,
    bgImage: "url(andricgrad.jpg)", // Zamenite sa pravim URL-om slike
  },
  {
    title: "Višegradska Banja",
    subtitle: "IZVORI LEKOVITE VODE",
    description: `Višegradska Banja je poznata po svojim termalnim izvorima i lekovitoj vodi koja pomaže u lečenju reumatskih i kožnih oboljenja. Idealno mesto za opuštanje i rehabilitaciju u prelepom prirodnom okruženju.`,
    bgImage: "url(banja.jpg)", // Zamenite sa pravim URL-om slike
  },
  {
    title: "Istražite Višegrad",
    subtitle: "VAŠA PUSTOLOVINA ČEKA",
    description: `Višegrad je grad bogat istorijom, kulturom i prirodnim lepotama, pružajući vam nezaboravno iskustvo. Od veličanstvenog Mosta Mehmed Paše Sokolovića do kulturnog kompleksa Andrićgrad i opuštanja u Višegradskoj Banji, svaki kutak ovog grada priča svoju jedinstvenu priču. Ne propustite priliku da istražite sve što Višegrad nudi i stvorite svoja vlastita nezaboravna sećanja.`,
    bgImage: "url(visegrad.jpg)", // Zamenite sa pravim URL-om slike
    url: "/map",
  },
  // Add more sections as needed
];

const HomePage: React.FC = () => {
  const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "auto", // Allows vertical scrolling
        scrollSnapType: "y mandatory", // Enables snap scroll
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sections.map((section, index) => (
        <Box
          sx={{
            scrollSnapAlign: "start", // Makes each section snap to the top
            scrollBehavior: "smooth",
            position: "relative",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: section.bgImage,

              filter: "blur(8px)", // Apply blur here

              zIndex: -0, // Ensure overlay is behind content but on top of the background
              //   borderRadius: "20px",
            },
          }}
        >
          <Box
            key={index}
            sx={{
              width: "90%",
              height: "90%",
              backgroundImage: section.bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              border: "1px solid white",
              borderRadius: "20px",
              display: "flex",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0,0.5)", // Dark overlay with 50% opacity
                zIndex: 1, // Ensure overlay is behind content but on top of the background
                borderRadius: "20px",
              },
              //   scrollSnapAlign: "start", // Makes each section snap to the top
              //   scrollBehavior: "smooth",
            }}
          >
            {/* Header */}

            {/* Main Content */}
            <Grid2
              zIndex={2}
              spacing={1}
              container
              alignSelf={"center"}
              height={"70%"}
              alignItems={"center"}
              width={"100%"}
              //   justifyContent={"center"}
              //   marginLeft={"50px"}
            >
              <Grid2
                sm={12}
                md={6}
                textAlign={"left"}
                mdOffset={1}
                padding={"5%"}
              >
                <Typography variant="h5">{section.subtitle}</Typography>
                <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {section.description}
                </Typography>
                {index === 4 && (
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={section.url!}
                  >
                    <Button variant="text" color="inherit">
                      Prikaži cijelu ponudu
                      <ChevronRightIcon />
                    </Button>
                  </Link>
                )}
              </Grid2>
            </Grid2>

            {/* Social Media Links */}
            <Box
              sx={{
                position: "absolute",
                bottom: "5%",
                // left: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
              zIndex={2}
            >
              {index != 4 && (
                <KeyboardDoubleArrowDownIcon
                  sx={{
                    width: "50px",
                    height: "50px",
                    //   transform: "rotate(45deg)",
                    position: "relative",
                    //   margin: 0 auto;
                    animation: `${bounce} 1s infinite`,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;
