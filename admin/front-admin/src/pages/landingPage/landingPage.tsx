import React from "react";
import {
  Box,
  Typography,
  Button,
  keyframes,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

const sections = [
  {
    title: "",
    subtitle: "",
    description: `Očuvanje životne sredine obuhvata niz aktivnosti i strategija koje pomažu u zaštiti prirodnih resursa i smanjenju negativnih uticaja ljudskih aktivnosti na ekosistem. Ključni ciljevi uključuju smanjenje zagađenja, očuvanje biodiverziteta, odgovorno upravljanje resursima poput vode i energije, kao i smanjenje otpada kroz reciklažu i ponovnu upotrebu. Ove prakse ne samo da doprinose stabilnosti ekosistema, već poboljšavaju kvalitet života ljudi i pomažu u očuvanju planete za buduće generacije.`,
    bgImage: "url(ekologija1.png)",
  },
  {
    title: "",
    subtitle: "",
    description: `Zelene površine igraju ključnu ulogu u poboljšanju kvaliteta života u urbanim sredinama, jer pomažu u smanjenju zagađenja vazduha, apsorpciji ugljen-dioksida i regulisanju temperature. One obezbeđuju staništa za raznovrsne biljne i životinjske vrste, podržavajući biodiverzitet i ekološku ravnotežu. Pored ekoloških koristi, zelene površine stvaraju prostor za rekreaciju i opuštanje, što pozitivno utiče na fizičko i mentalno zdravlje građana.`,
    bgImage: "url(ekologija2.png)",
  },
  {
    title: "",
    subtitle: "",
    description: `Ekologija je ključna za očuvanje prirodnih resursa koji su neophodni za život – čist vazduh, vodu i plodno tlo. Održavanje ekološke ravnoteže pomaže u smanjenju klimatskih promena i zagađenja, što direktno utiče na zdravlje ljudi i opstanak biljnih i životinjskih vrsta. Briga o životnoj sredini omogućava stabilnije uslove za život, sprečava degradaciju ekosistema i osigurava da buduće generacije mogu uživati u prirodnim lepotama i resursima planete.`,
    bgImage: "url(ekologija3.png)",
  },
];

const HomePage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          key={index}
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
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                position: "absolute",
                top: "1%",
                right: "1%",
                zIndex: "10000",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/map"}
              >
                <MenuItem onClick={handleClose}>Mapa</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/sveNovosti/1"}
              >
                <MenuItem onClick={handleClose}>Novosti</MenuItem>
              </Link>
            </Menu>
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
