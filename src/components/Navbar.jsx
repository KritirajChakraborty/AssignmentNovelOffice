import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Switch,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleTabChange = (e, newValue) => {
    navigate(newValue);
  };

  const routes = [
    { label: "HOME", path: "/" },
    { label: "EXCHANGE RATES (LIVE)", path: "/live-currency" },
    { label: "ABOUT", path: "/about" },
    { label: "ERROR PAGE", path: "/error" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Hamburger icon for mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {/* For Desktop view  */}
          {!isMobile && (
            <Tabs
              value={
                routes.find((route) => route.path === location.pathname)
                  ? location.pathname
                  : false
              }
              onChange={handleTabChange}
            >
              {routes.map((route) => (
                <Tab
                  key={route.path}
                  label={route.label}
                  value={route.path}
                  sx={{
                    borderRadius: "6px",
                    px: 2,
                    m: 0.5,
                    color: "#fff",
                    backgroundColor:
                      location.pathname === route.path
                        ? "#64b5f6"
                        : "transparent",
                    "&.Mui-selected": {
                      color: "#fff",
                    },
                    "&:hover": {
                      backgroundColor: "#0d6cc4",
                    },
                  }}
                />
              ))}
            </Tabs>
          )}

          <Switch color="default" />
        </Toolbar>
      </AppBar>

      {/* For Mobile Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {routes.map((route) => (
            <ListItem
              key={route.path}
              button
              selected={location.pathname === route.path}
              onClick={() => {
                navigate(route.path);
                setDrawerOpen(false);
              }}
              sx={{
                backgroundColor:
                  location.pathname === route.path ? "#1976d2" : "transparent",
                color: location.pathname === route.path ? "#fff" : "inherit",
                fontWeight:
                  location.pathname === route.path ? "bold" : "normal",
                "&:hover": {
                  backgroundColor:
                    location.pathname === route.path ? "#1565c0" : "#f5f5f5",
                },
              }}
            >
              <ListItemText primary={route.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
