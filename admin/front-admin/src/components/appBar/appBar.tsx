import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Link } from "react-router-dom";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ProfileMenu from "../profileMenu/profileMenu";
import { useSelector } from "react-redux";
import callApi from "../../api/api";
import { RootState } from "../../redux/store";
import { getAuth } from "../../util/get-auth";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pageTitle, setPageTitle] = useState("Turistička mjesta");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id);
  const storedRole = useSelector((state: RootState) => state.user.role);
  const user = getAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  useEffect(() => {
    const updateUsername = async () => {
      const data = await callApi.Auth.getOne(userId);

      setUserName(data.firstName + " " + data.lastName);
    };
    updateUsername();
  }, []);
  useEffect(() => {
    setUserRole(storedRole);
  }, []);
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div>
        <Toolbar></Toolbar>
        <List>
          <ListItem key={"Turisticka mjesta"} disablePadding>
            <ListItemButton
              component={Link}
              to="turistickaMjesta"
              onClick={() => {
                setPageTitle("Turistička mjesta");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <RoomOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Turistička mjesta"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Novosti"} disablePadding>
            <ListItemButton
              component={Link}
              to="novosti/1"
              onClick={() => {
                setPageTitle("Novosti");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <NewspaperOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Novosti"} />
            </ListItemButton>
          </ListItem>
          {storedRole === "ADMIN" && (
            <ListItem key={"Korisnički nalozi"} disablePadding>
              <ListItemButton
                component={Link}
                to="korisnickiNalozi"
                onClick={() => {
                  setPageTitle("Korisnički nalozi");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <SupervisedUserCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Korisnički nalozi"} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Divider />
      </div>
      <div>
        {" "}
        <Divider />
        <Toolbar
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "0",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <Typography>{userName}</Typography>
            <Typography fontSize={11}>
              {userRole === "ADMIN" ? "Administrator" : "Korisnik"}
            </Typography>
          </div>
          <ProfileMenu userId={userId} closeHandler={handleDrawerClose} />
        </Toolbar>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div style={{ width: "100%" }}>
          <Outlet></Outlet>
        </div>
      </Box>
    </Box>
  );
}
