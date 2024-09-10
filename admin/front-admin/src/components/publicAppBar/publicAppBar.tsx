import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, useNavigate } from "react-router-dom";

const PublicAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const pages = [
    { title: "Početna", url: "/home" },
    { title: "Mapa", url: "/map" },
    { title: "Novosti", url: "/sveNovosti/1" },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            borderRadius: "5px",
            padding: "1rem",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
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
              position: "relative",
            }}
          >
            {pages.map((page: any) => (
              <Button
                key={page.title}
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
          </Box>
        </Toolbar>
        <Outlet />
      </Container>
    </AppBar>
  );
};

export default PublicAppBar;
