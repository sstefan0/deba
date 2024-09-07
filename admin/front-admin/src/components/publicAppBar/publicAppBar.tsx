import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import callApi from "../../api/api";

const PublicAppBar = () => {
  const [types, setTypes] = React.useState<any>([]);
  const data: any = useLoaderData();
  console.log(data);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElPopover, setAnchorElPopover] =
    React.useState<null | HTMLElement>(null);
  const [hoveredType, setHoveredType] = React.useState<any>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [popoverPosition, setPopoverPosition] = React.useState({
    top: 0,
    left: 0,
  });
  const [popoverWidth, setPopoverWidth] = React.useState(0);
  const [popoverColor, setPopoverColor] = React.useState("");
  const navigate = useNavigate();
  const pages = [
    { title: "Početna", url: "/home" },
    { title: "Mapa", url: "/map" },
    { title: "Novosti", url: "/sveNovosti/1" },
  ];

  React.useEffect(() => {
    const fetchTypes = async () => {
      const response = await callApi.TouristSpots.getTypes();
      setTypes(response);
    };
    fetchTypes();
  }, []);

  let popoverTimeout: ReturnType<typeof setTimeout>;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Open the popover on mouse over
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    type: any,
    color: any
  ) => {
    clearTimeout(popoverTimeout); // Clear any pending close events
    const coordinates = event.currentTarget.getBoundingClientRect(); // Get button position
    setPopoverColor(color);
    setPopoverPosition({
      top: coordinates.bottom, // Position right under the button
      left: coordinates.left, // Align to the left of the button
    });
    setPopoverWidth(coordinates.width);

    setAnchorElPopover(event.currentTarget); // Set the anchor element for the popover
    setHoveredType(type); // Set the hovered item data
    setPopoverOpen(true); // Open the popover
  };

  // Close the popover
  const handlePopoverClose = () => {
    setPopoverOpen(false); // Close popover
  };

  const handlePopoverStayOpen = () => {
    clearTimeout(popoverTimeout); // Cancel closing when hovering over the popover
  };

  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            // borderBottom: "1px solid white",
            // borderRight: "1px solid white",
            // borderLeft: "1px solid white",
            borderRadius: "5px",
            padding: "1rem",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Box-shadow property
            width: "100%",
            background: "#1c1c1a",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Višegrad
          </Typography>

          {/* Mobile menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="open mobile menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ marginLeft: "auto", marginRight: "auto" }}
            >
              {pages.map((page: any) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navigate(page.url);
                  }}
                  sx={{ borderBottom: `1px solid ${page.color}` }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="/"
              textAlign={"center"}
              sx={{
                mr: 2,
                display: { xs: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                zIndex: "1000",
              }}
            >
              Višegrad
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: "30px" },
              justifyContent: "center",
              position: "relative", // Set relative positioning for the popover to be positioned correctly
            }}
          >
            {pages.map((page: any) => (
              <Button
                key={page.title}
                // onMouseOver={(event) =>
                // handlePopoverOpen(event, page.name, page.color)
                // } // Trigger popover on hover
                // onMouseOut={handlePopoverClose} // Close popover when mouse leaves
                onClick={() => navigate(page.url)}
                sx={{
                  color: "white",
                  display: "block",
                  boxSizing: "border-box",
                  borderBottom: `1px solid white`,
                  position: "relative",
                }}
              >
                {page.title}
              </Button>
            ))}

            {/* Popover */}
            {popoverOpen && (
              <Box
                sx={{
                  position: "fixed",
                  top: `${popoverPosition.top + 5}px`, // Positioning from button coordinates
                  left: `${popoverPosition.left}px`,
                  borderRadius: "15px",
                  background: "#232323",
                  color: "white",
                  border: `1px solid ${popoverColor}`,
                  p: 2,
                  zIndex: 100, // Ensure popover appears above other content
                }}
                onMouseEnter={handlePopoverStayOpen} // Keep the popover open when hovering
                onMouseLeave={handlePopoverClose} // Close popover when leaving
              >
                {data[hoveredType]
                  ? data[hoveredType].map((item: any) => (
                      <Typography>{item.name}</Typography>
                    ))
                  : "Nema dodatnih informacija"}
              </Box>
            )}
          </Box>
        </Toolbar>
        <Outlet />
      </Container>
    </AppBar>
  );
};

export default PublicAppBar;
