import { useState } from "react";
import { Button, Divider, Grid, Menu, MenuItem } from "@mui/material";
import { Widgets } from "@mui/icons-material";
import FluffImage from "../../assets/Fluff1.png";
import "./Navbar.css";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <Grid
        container
        columns={{ xs: 6, sm: 6, md: 6 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingY={3}
      >
        <Grid item xs={1} textAlign={"center"} className="nav-icon">
          <img src={FluffImage} alt="Fluff Logo" width={100} />
        </Grid>
        <Grid item xs={3} alignItems={"center"}>
          <h2>The Internet</h2>
        </Grid>
        <Grid item xs={1} alignItems={"center"} className="menu-section">
          <Button
            id="menu-button"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <p>Menu</p>
            <Widgets sx={{ color: "#f9eae6" }} />
          </Button>
          <Menu
            id="menu"
            aria-labelledby="menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <a href="#UsersXYear">Year</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="#UsersXCountry">Country</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="#TopCountries">Top 10</a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>World Map</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
};
