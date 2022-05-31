import GymCard from "../components/Gyms/GymCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useCallback, useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";
import { CircularProgress } from "@mui/material";

export default function MyGyms() {
  const [gyms, setGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const fetchGymsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/trainers/gyms", {
        headers: {
          Authorization: authCtx.token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const gyms = [];

      for (const key in data) {
        gyms.push({
          _id: data[key]._id,
          name: data[key].name,
        });
      }

      setGyms(gyms);
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
      You don't have any gyms.
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
        My Gyms
      </Typography>
      {gyms.length > 0 && (
        <Grid container rowSpacing={3} justifyContent="center">
          {gyms.map((element, index) => (
            <Grid item key={index}>
              <GymCard {...element} mappedFrom="MyGyms" />
            </Grid>
          ))}
        </Grid>
      )}
      {gyms.length <= 0 && <div>{content} </div>}
    </Container>
  );
}
