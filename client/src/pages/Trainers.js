import Grid from "@mui/material/Grid";
import TrainerCard from "../components/Trainers/TrainerCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import { useState, useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrainersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/trainers");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedTrainers = [];

      for (const key in data) {
        loadedTrainers.push({
          _id: data[key]._id,
          first_name: data[key].first_name,
          last_name: data[key].last_name,
          email: data[key].email,
          image: data[key].image,
        });
      }

      setTrainers(loadedTrainers);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTrainersHandler();
  }, [fetchTrainersHandler]);

  let content = (
    <Typography
      sx={{ fontSize: 25, fontWeight: "bold" }}
      color="white"
      textAlign="center"
      gutterBottom
    >
      Found no trainers.
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
        Trainers
      </Typography>
      {trainers.length > 0 && (
        <Grid container rowSpacing={3} justifyContent="center">
          <Grid>
            <ImageList cols={3} gap={15}>
              {trainers.map((element) => (
                <TrainerCard key={element._id} {...element} />
              ))}
              );
            </ImageList>
          </Grid>
        </Grid>
      )}
      {trainers.length <= 0 && <div>{content} </div>}
    </Container>
  );
}
