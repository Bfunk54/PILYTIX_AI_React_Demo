// React component
import * as React from "react";

// MUI components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";

// MUI styled components
const Buttons = styled(Button)({
  backgroundColor: "#3abaff",
  color: "white",
  display: "block",
  textTransform: "none",
  fontSize: "16px",
});

const MenuItems = styled(MenuItem)({
  ":hover": { backgroundColor: "transparent" },
});

export default function MobileDrawer() {
  return (
    /* Only the actual buttons for the menu,
        the menu is rendered onClick in the Header component */
    <>
      <Toolbar disableGutters>
        <Box
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexGrow: 1,
            display: { xs: "flex", sm: "flex", md: "none" },
            flexDirection: "column",
          }}
        >
          <MenuItems>
              <Buttons size="small" variant="contained">
                Solutions
              </Buttons>
          </MenuItems>

          <MenuItems>
              <Buttons size="small" variant="contained">
                Insights
              </Buttons>
          </MenuItems>

          <MenuItems>
              <Buttons size="small" variant="contained">
                About Us
              </Buttons>
          </MenuItems>

          <MenuItems>
              <Buttons size="small" variant="contained">
                Contact Us
              </Buttons>
          </MenuItems>

          <MenuItems>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "#2ecdb0",
                  color: "white",
                  display: "block",
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "20px",
                }}
              >
                Request Demo
              </Button>
          </MenuItems>
        </Box>
      </Toolbar>
    </>
  );
}
