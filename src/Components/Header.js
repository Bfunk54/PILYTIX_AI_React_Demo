import * as React from "react";
import { Box, Toolbar, Typography, Container, AppBar, Link } from "@mui/material";
import logo from "../images/pilytix-logo.png"

export default function NavBar() {
  return (
    <AppBar
      sx={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}
      position="fixed"
    >
        <Container maxWidth="xl">
        <Toolbar className="logo" disableGutters>
          <Box
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex"
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  <img height="80px" width="200px" src={logo} />
                </Link>
              </Box>
              </Box>
              </Box>
              </Toolbar>
              </Container>
    </AppBar>
    
  );
}
