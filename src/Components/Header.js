import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import logo from "../images/pilytix-logo.png";
import { styled } from "@mui/system";
import "./Header/Header.css";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileDrawer from "./Drawer";

const Buttons = styled(Button)({
  my: 2,
  backgroundColor: "#3abaff",
  color: "white",
  display: "block",
  marginRight: "20px",
  textTransform: "none",
  fontSize: "16px",
});

export default function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      sx={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}
      position="fixed"
      className="wholeNav"
    >
      <Box
        className="headerBox"
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <img height="80px" width="210px" src={logo} />
          </Link>
        </Box>
      </Box>
      {/* {isMobile ? ( */}
        <MobileDrawer />
      {/* ) : ( */}
        <Toolbar className="toolbar" disableGutters>
          {/* <Box className="hambugerBox" sx={{display: { xs: "flex", sm: "flex", md: "none" }, marginBottom: "5px"}}>
          <Hamburger
            onToggle={toggleDrawer(true)}
            color="rgb(23, 154, 211)"
            rounded={true}
            size={38}
          />
            </Box> */}
          <Box
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
              flexGrow: 1,
              marginLeft: "50px",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Link to="/solutions" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Solutions
              </Buttons>
            </Link>

            <Link to="/insights" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Insights
              </Buttons>
            </Link>

            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                About Us
              </Buttons>
            </Link>

            <Link to="/contact-us" style={{ textDecoration: "none" }}>
              <Buttons size="small" variant="contained">
                Contact Us
              </Buttons>
            </Link>
          </Box>
          <Box
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              flexGrow: 1,
              marginLeft: "20px",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Link to="/request-demo" style={{ textDecoration: "none" }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  my: 2,
                  backgroundColor: "#2ecdb0",
                  color: "white",
                  display: "block",
                  marginLeft: "-1px",
                  marginRight: "10px",
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "20px",
                }}
              >
                Request Demo
              </Button>
            </Link>
          </Box>
        </Toolbar>
      {/* )} */}
    </AppBar>
  );
}
