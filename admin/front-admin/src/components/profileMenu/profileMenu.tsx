import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/user-slice";
import { useDispatch } from "react-redux";

export default function ProfileMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  const handleProfile = () => {
    navigate(`/urediNalog/${props.userId}`);
  };

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ExpandMoreTwoToneIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleProfile}>Podešavanja naloga</MenuItem>
        <MenuItem onClick={handleLogout}>Odjavi se</MenuItem>
      </Menu>
    </div>
  );
}
