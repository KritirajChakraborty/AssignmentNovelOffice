import { useState } from "react";
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
import { useThemeMode } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, toggleMode } = useThemeMode();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <AppBar position="static">
        <Toolbar>
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

          {!isMobile && (
            <Tabs
              value={
                routes.find((route) => route.path === location.pathname)
                  ? location.pathname
                  : false
              }
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              {routes.map((route) => (
                <Tab
                  key={route.path}
                  label={route.label}
                  value={route.path}
                  sx={{
                    m: 0.5,
                    borderRadius: 1,
                    color: theme.palette.common.white,
                    opacity: location.pathname === route.path ? 1 : 0.7,
                    "&.Mui-selected": {
                      color: theme.palette.common.white,
                      backgroundColor: mode === "dark" ? "#3d3b3b" : "#2c88dd",
                    },
                    "&:hover": {
                      backgroundColor: mode === "dark" ? "#3d3b3b" : "#0d6cc4",
                    },
                  }}
                />
              ))}
            </Tabs>
          )}

          <Switch
            checked={mode === "dark"}
            onChange={toggleMode}
            color="default"
          />
        </Toolbar>
      </AppBar>

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
                  location.pathname === route.path
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  location.pathname === route.path
                    ? theme.palette.common.white
                    : theme.palette.text.primary,
                fontWeight:
                  location.pathname === route.path ? "bold" : "normal",
                "&:hover": {
                  backgroundColor:
                    location.pathname === route.path
                      ? theme.palette.primary.dark
                      : theme.palette.action.hover,
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
