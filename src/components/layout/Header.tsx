import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { RouterLink } from "../RouterLink/RouterLink";
import { RootState } from "../../redux/redux";
import { auth } from "../../firebase/firebase-config";
import { authActions } from "../../redux/auth-slice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export const Header: React.FC = (props: Props) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      dispatch(authActions.setUser(undefined));
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               For Mobile View : Start                       */
  /* -------------------------------------------------------------------------- */
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Expense Tracker
      </Typography>
      <Divider />
      <List>
        {!user && (
          <>
            <RouterLink navigateLink="/login">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            </RouterLink>
            <RouterLink navigateLink="/register">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </RouterLink>
          </>
        )}
        {user && (
          <>
            <ListItem>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={`Welcome Back ${user?.displayName}`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleOnLogout}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  /* -------------------------------------------------------------------------- */
  /*                           For Mobile View : End                            */
  /* -------------------------------------------------------------------------- */

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} sx={{ background: "#d0bfff" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#000",
              display: { xs: "none", sm: "block" },
            }}
          >
            Expense Tracker
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!user && (
              <>
                <RouterLink navigateLink="/login">
                  <Button variant="text" color="secondary" size="large">
                    Login
                  </Button>
                </RouterLink>
                <RouterLink navigateLink="/register">
                  <Button variant="text" color="secondary" size="large">
                    Register
                  </Button>
                </RouterLink>
              </>
            )}
            {user && (
              <Stack direction="row" alignItems={"center"} gap={2}>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ color: "#000" }}
                >
                  Welcome Back {user.displayName}
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  size="large"
                  onClick={handleOnLogout}
                >
                  Logout
                </Button>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
};
