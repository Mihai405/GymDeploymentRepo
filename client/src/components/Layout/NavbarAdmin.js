import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { StyledButton } from "../../styles/Styles";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const NavbarAdmin = () => {
  const authCtx = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" color="transparent" sx={{ boxShadow: "0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiMenu-list": {
                  backgroundColor: "#000",
                },
              }}
            >
              <MenuItem key="HiMobile" onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "#fff", display: "block" }}
                >
                  {`Hi admin ${authCtx.name}`}
                </Typography>
              </MenuItem>
              <MenuItem key="GymsMobile" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to="Gyms"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    Gyms
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem key="AddGymMobile" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to={`/AddGym`}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    Add a Gym
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem key="logoutMobile" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to={`/`}
                    onClick={authCtx.logout}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    Logout
                  </NavLink>
                </Typography>
              </MenuItem>
              )
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: { xs: "1.2rem" },
              marginLeft: { xs: "119px" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            PumpHouse
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            PumpHouse
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              marginLeft: 5,
            }}
          >
            <Button
              key="Gyms"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <NavLink
                to="/Gyms"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                Gyms
              </NavLink>
            </Button>

            <Button
              key="AddGym"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <NavLink
                to="/AddGym"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                Add a Gym
              </NavLink>
            </Button>
          </Box>

          <Box
            justifyContent="flex-end"
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/myClasses"
              marginRight={2}
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              {`Hi admin ${authCtx.name}`}
            </Typography>
            <StyledButton variant="contained" onClick={authCtx.logout}>
              <NavLink
                to={"/"}
                style={{
                  textDecoration: "none",
                }}
              >
                Logout
              </NavLink>
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarAdmin;
