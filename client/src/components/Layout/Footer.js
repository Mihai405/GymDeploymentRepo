import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer style={{ position: "absolute", width: "100%", bottom: 0 }}>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor="#000">
        <Container maxWidth="lg">
          <Grid container spacing={5} textAlign="center" pb={{ xs: 3, sm: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor={"white"} color={"white"}>
                Help
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Contact
                </Link>
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Support
                </Link>
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor={"white"} color={"white"}>
                Account
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Login
                </Link>
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} borderColor={"white"} color={"white"}>
                Idkkk
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Gyms
                </Link>
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Classes
                </Link>
              </Box>
              <Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  Trainers
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pb={{ xs: 1, sm: 1 }} pt={{ xs: 5, sm: 3 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                paddingInline: 5,
              }}
            >
              <InstagramIcon fontSize="large" />
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                paddingInline: 5,
              }}
            >
              <WhatsAppIcon fontSize="large" />
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                paddingInline: 5,
              }}
            >
              <FacebookIcon fontSize="large" />
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                paddingInline: 5,
              }}
            >
              <LinkedInIcon fontSize="large" />
            </Link>
          </Box>
          <Box textAlign="center" pb={{ xs: 5, sm: 0 }} sx={{ color: "#fff" }}>
            PumpHouse &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
