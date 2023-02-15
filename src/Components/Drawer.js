import * as React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import Hamburger from "hamburger-react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

export default function MobileDrawer() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setMenuOpen(newOpen);
    console.log(open);
  };

  const Buttons = styled(Button)({
    my: 2,
    backgroundColor: "#3abaff",
    color: "white",
    display: "block",
    marginRight: "20px",
    textTransform: "none",
    fontSize: "16px",
  });

  return (
    <>
      <Toolbar disableGutters>
        <Box
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexGrow: 1,
            marginLeft: "20px",
            display: { xs: "flex", sm: "flex", md: "none" },
            flexDirection: "column",
          }}
        >
          <MenuItem>
            <Link to="/solutions" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Solutions
              </Buttons>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to="/insights" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Insights
              </Buttons>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                About Us
              </Buttons>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to="/contact-us" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Contact Us
              </Buttons>
            </Link>
          </MenuItem>
        </Box>
      </Toolbar>
    </>
  );
}
