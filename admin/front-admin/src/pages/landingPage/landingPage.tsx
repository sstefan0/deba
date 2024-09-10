import React from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const sections = [
  {
    title: "Otkrijte Višegrad",
    subtitle: "ISTORIJSKI GRAD NA DRINI",
    description: `Višegrad je grad poznat po svojoj bogatoj istoriji i kulturnom naslijeđu. Smješten na obalama rijeke Drine, nudi jedinstven spoj prirodnih ljepota i istorijskih znamenitosti. Posjetioci mogu uživati u šetnjama pored rijeke, istraživanju lokalnih muzeja i uživanju u autentičnoj bosanskoj kuhinji.`,
    bgImage: "url(prvaslika.jpeg)",
  },
  {
    title: "Most Mehmed Paše Sokolovića",
    subtitle: "UNESCO SPOMENIK KULTURE",
    description: `Ovaj veličanstveni most iz 16. vijeka predstavlja remek-djelo osmanske arhitekture. Most Mehmed Paše Sokolovića, djelo čuvenog graditelja Mimara Sinana, danas je pod zaštitom UNESCO-a. Preko rijeke Drine, most povezuje ne samo dvije obale već i bogatu istoriju Višegrada sa svijetom.`,
    bgImage: "url(drugaslika.jpeg)",
  },
  {
    title: "Andrićgrad",
    subtitle: "GRAD OD KAMENA POSVEĆEN ANDRIĆU",
    description: `Andrićgrad je kulturni, obrazovni, i turistički kompleks inspirisan djelima Ive Andrića, dobitnika Nobelove nagrade za književnost. Grad od kamena simbolizuje bogato kulturno naslijeđe Višegrada i Balkana, sa mješavinom arhitektonskih stilova iz različitih perioda istorije.`,
    bgImage: "url(andricgrad.jpg)",
  },
  {
    title: "Višegradska Banja",
    subtitle: "IZVORI LJEKOVITE VODE",
    description: `Višegradska Banja je poznata po svojim termalnim izvorima i ljekovitoj vodi koja pomaže u liječenju reumatskih i kožnih oboljenja. Idealno mjesto za opuštanje i rehabilitaciju u prelijepom prirodnom okruženju.`,
    bgImage: "url(banja.jpg)",
  },
  {
    title: "Istražite Višegrad",
    subtitle: "VAŠA PUSTOLOVINA ČEKA",
    description: `Višegrad je grad bogat istorijom, kulturom i prirodnim ljepotama, pružajući vam nezaboravno iskustvo. Od veličanstvenog Mosta Mehmed Paše Sokolovića do kulturnog kompleksa Andrićgrad i opuštanja u Višegradskoj Banji, svaki kutak ovog grada priča svoju jedinstvenu priču. Ne propustite priliku da istražite sve što Višegrad nudi i stvorite svoja vlastita nezaboravna sjećanja.`,
    bgImage: "url(visegrad.jpg)", // Zamenite sa pravim URL-om slike
    url: "/map",
  },
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
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sections.map((section, index) => (
        <Box
          sx={{
            scrollSnapAlign: "start",
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

              filter: "blur(8px)",

              zIndex: -0,
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
                backgroundColor: "rgba(0, 0, 0,0.5)",
                zIndex: 1,
                borderRadius: "20px",
              },
            }}
          >
            <Grid2
              zIndex={2}
              spacing={1}
              container
              alignSelf={"center"}
              height={"70%"}
              alignItems={"center"}
              width={"100%"}
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

            <Box
              sx={{
                position: "absolute",
                bottom: "5%",
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
                    position: "relative",
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
