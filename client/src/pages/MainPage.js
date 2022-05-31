import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import MainPageWallpaper from "./../assets/MainPage/MainPageWallpaper.png";
import AboutWallpaper from "./../assets/MainPage/AboutWallpaper.jpg";
import ClassesWallpaper from "./../assets/MainPage/ClassesWallpaper.jpg";
import GooglePlay from "./../assets/MainPage/AppStore.png";
import AppStore from "./../assets/MainPage/GooglePlay.png";
import MobileAdd from "./../assets/MainPage/MobileAdd.png";

const MainPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="xl">
          <Box
            sx={{
              backgroundImage: `url(${MainPageWallpaper})`,
              backgroundSize: "cover",
              height: "100vh",
              maxHeight: "980px",
              backgroundPosition: "bottom right",
              position: "relative",
            }}
          >
            <Typography
              color="white"
              sx={{
                typography: { xs: "h4", md: "h2" },
                width: { xs: "200px", md: "650px" },
                fontWeight: { xs: 400, md: 700 },
                textAlign: "center",
                position: "absolute",
                letterSpacing: ".2rem",
                top: { xs: "64%", md: "14%" },
                marginLeft: { xs: "43px" },
              }}
            >
              IT’S ALL ABOUT WHAT YOU CAN ACHIEVE
            </Typography>
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Grid container item bgcolor="#1c1c1c">
          <Grid item xs={12} md={7} paddingY={5} sx={{ paddingX: { xs: 0, md: 10 } }}>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h4"
                color="white"
                sx={{
                  fontWeight: 450,
                  textAlign: "center",
                  letterSpacing: ".2rem",
                }}
                marginBottom={7}
              >
                ABOUT PUMPHOUSE
              </Typography>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: 350,
                  letterSpacing: ".2rem",
                  maxWidth: "550px",
                }}
                marginBottom={7}
              >
                We’re not here to carry you to fitness, we’re here to motivate you to
                carry yourself to your goals.
              </Typography>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: 350,
                  letterSpacing: ".2rem",
                  maxWidth: "550px",
                }}
              >
                If you’re not sure what your goals are, or don’t know where to start on
                your fitness journey, come in and speak to one of our qualified trainers
                who can help you develop a plan.
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundImage: `url(${AboutWallpaper})`,
                backgroundSize: "cover",
                height: "75vh",
                maxHeight: "504px",
                backgroundPosition: { xs: "top center", md: "top left" },
                position: "relative",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container item bgcolor="#f2f3f5">
          <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                backgroundImage: `url(${ClassesWallpaper})`,
                height: "75vh",
                maxHeight: "504px",
                backgroundPosition: "bottom right",
                backgroundSize: "cover",
                position: "relative",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            paddingY={5}
            order={{ xs: 1, md: 2 }}
            sx={{ paddingX: { xs: 0, md: 10 } }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 450,
                  textAlign: "center",
                  letterSpacing: ".2rem",
                }}
                marginBottom={7}
              >
                Classes
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 350,
                  letterSpacing: ".2rem",
                  maxWidth: "550px",
                }}
                marginBottom={7}
              >
                We host dozens of classes every day, from deadlifting and HIIT to yoga and
                pilates. We also have different classes for varying levels of ability.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 350,
                  letterSpacing: ".2rem",
                  maxWidth: "550px",
                }}
              >
                Check out our individual class pages to see what’s on when, and stop on by
                for a chat if you want to see how we do things.
              </Typography>
            </Container>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          item
          bgcolor="#1c1c1c"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Grid item xs={12} md={7} paddingY={5} sx={{ paddingLeft: { xs: 0, md: 10 } }}>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h4"
                color="white"
                sx={{
                  fontWeight: 450,
                  textAlign: "center",
                  letterSpacing: ".2rem",
                }}
                marginBottom={7}
              >
                MOBILE VERSION
              </Typography>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: 350,
                  letterSpacing: ".2rem",
                  maxWidth: "550px",
                }}
                marginBottom={7}
              >
                Your favorite gym app is now available on mobile.
              </Typography>
              <Grid container item spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundImage: `url(${GooglePlay})`,
                      height: "10vh",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      backgroundImage: `url(${AppStore})`,
                      height: "10vh",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundImage: `url(${MobileAdd})`,
                // backgroundRepeat: "no-repeat",
                height: "447px",
                maxHeight: "447px",
                backgroundPosition: "bottom right",
                backgroundSize: "cover",
                position: "relative",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
