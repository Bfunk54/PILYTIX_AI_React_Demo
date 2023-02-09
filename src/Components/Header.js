import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../images/pilytix-logo.png";
import "./Header/Header.css";

export default function NavBar() {
  return (
    <AppBar
      sx={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}
      position="fixed"
      className="nav"
    >
      <Container>
        <Toolbar disableGutters>
            <Box
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
            <Box
              sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                flexGrow: 1,
                marginLeft: "20px",
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              <Link to="/solutions" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    my: 2,
                    backgroundColor: "#3abaff",
                    color: "white",
                    display: "block",
                    marginRight: "20px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Solutions
                </Button>
              </Link>

              <Link to="/insights" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    my: 2,
                    backgroundColor: "#3abaff",
                    color: "white",
                    display: "block",
                    marginRight: "20px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Insights
                </Button>
              </Link>

              <Link to="/about-us" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    my: 2,
                    backgroundColor: "#3abaff",
                    color: "white",
                    display: "block",
                    marginRight: "20px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  About Us
                </Button>
              </Link>

              <Link to="/contact-us" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    my: 2,
                    backgroundColor: "#3abaff",
                    color: "white",
                    display: "block",
                    marginRight: "20px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Contact Us
                </Button>
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
      </Container>
    </AppBar>
  );
}
