import * as React from "react";
import Drawer from "@mui/material/Collapse";
import Hamburger from "hamburger-react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

export default function MobileDrawer() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
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
        <Drawer 
        open={open}
        onClose={() => setOpen(false)}
        >
            <Toolbar className="toolbar" disableGutters>
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
                <Buttons
                  size="small"
                  variant="contained"
                >
                  Solutions
                </Buttons>
              </Link>

              <Link to="/insights" style={{ textDecoration: "none" }}>
                <Buttons
                  size="small"
                  variant="contained"
                >
                  Insights
                </Buttons>
              </Link>

              <Link to="/about-us" style={{ textDecoration: "none" }}>
                <Buttons
                  size="small"
                  variant="contained"
                >
                  About Us
                </Buttons>
              </Link>

              <Link to="/contact-us" style={{ textDecoration: "none" }}>
                <Buttons
                  size="small"
                  variant="contained"
                >
                  Contact Us
                </Buttons>
              </Link>
            </Box>
            </Toolbar>
        </Drawer>
        <Hamburger
        onToggle={() => setOpen(!open)}
        color="rgb(23, 154, 211)"
        rounded={true}
        size={38}
      />
      </>
    );
}