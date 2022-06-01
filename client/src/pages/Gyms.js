import * as React from "react";
import Grid from "@mui/material/Grid";
import GymCard from "../components/Gyms/GymCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useCallback, useEffect, useContext } from "react";
import { CircularProgress } from "@mui/material";
import AuthContext from "./../store/auth-context";

function Gyms() {
  const [gyms, setGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const removeJoinedGyms = (id) => {
    const updatedGyms = gyms.filter((gym) => gym._id !== id);
    setGyms(updatedGyms);
  };

  const fetchGymsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let url;
    if (authCtx.isLoggedIn) {
      url = "/trainers/availableGyms";
    } else {
      url = "/gyms";
    }
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: authCtx.isLoggedIn ? authCtx.token : "",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedGyms = [];

      for (const key in data) {
        loadedGyms.push({
          _id: data[key]._id,
          name: data[key].name,
        });
      }

      setGyms(loadedGyms);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.token]);

  useEffect(() => {
    fetchGymsHandler();
  }, [fetchGymsHandler]);

  let content = (
    <Typography
      sx={{ fontSize: 25, fontWeight: "bold" }}
      color="white"
      textAlign="center"
      gutterBottom
    >
      Found no gyms.
    </Typography>
  );

  if (error) {
    content = (
      <Typography
        sx={{ fontSize: 25, fontWeight: "bold" }}
        color="white"
        textAlign="center"
        gutterBottom
      >
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    content = <CircularProgress />;
  }

  return (
    <Container>
      <Typography
        sx={{
          fontSize: 42,
          fontWeight: "bold",
          textAlign: "center",
          mb: 10,
          mt: 3,
        }}
        color="white"
        gutterBottom
      >
        Gyms
      </Typography>
      {gyms.length > 0 && (
        <Grid container rowSpacing={3} justifyContent="center">
          {gyms.map((element, index) => (
            <Grid item key={index}>
              <GymCard {...element} removeJoinedGymHandler={removeJoinedGyms} />
            </Grid>
          ))}
        </Grid>
      )}
      {gyms.length <= 0 && <div>{content} </div>}
    </Container>
  );
}

export default Gyms;
