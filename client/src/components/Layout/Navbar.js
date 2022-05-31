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

const pages = ["Gyms", "Classes", "Trainers", "Prices", "MyClasses", "Login", "Register"];

const NavBar = () => {
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
              {authCtx.isLoggedIn && (
                <MenuItem key="Hi" onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "#fff", display: "block" }}
                  >
                    {`Hi ${authCtx.name}`}
                  </Typography>
                </MenuItem>
              )}
              {pages
                .filter(
                  (page) =>
                    page !== "Login" && page !== "Register" && page !== "MyClasses"
                )
                .map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to={`/${page}`}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          display: "block",
                        }}
                      >
                        {page}
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ))}
              {authCtx.isLoggedIn && (
                <MenuItem key="MyClasses" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={`/MyClasses`}
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        display: "block",
                      }}
                    >
                      MyClasses
                    </NavLink>
                  </Typography>
                </MenuItem>
              )}
              {authCtx.isLoggedIn && (
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
              )}
              {!authCtx.isLoggedIn &&
                ["Login", "Register"].map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to={`/${page}`}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          display: "block",
                        }}
                      >
                        {page}
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ))}
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
            {pages
              .filter(
                (page) => page !== "Login" && page !== "Register" && page !== "MyClasses"
              )
              .map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  <NavLink
                    to={`/${page}`}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    {page}
                  </NavLink>
                </Button>
              ))}
            {authCtx.isLoggedIn && (
              <Button
                key="MyClasses"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <NavLink
                  to={`/myClasses`}
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  MyClasses
                </NavLink>
              </Button>
            )}
          </Box>
          {!authCtx.isLoggedIn && (
            <Box justifyContent={"flex-end"} sx={{ display: { xs: "none", md: "flex" } }}>
              <StyledButton>
                <NavLink
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Login
                </NavLink>
              </StyledButton>
              <StyledButton variant="contained">
                <NavLink
                  to={"/register"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Register
                </NavLink>
              </StyledButton>
            </Box>
          )}
          {authCtx.isLoggedIn && (
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
                {`Hi ${authCtx.name}`}
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
