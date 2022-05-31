import ClassCard from "../components/Classes/ClassCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useCallback, useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";
import { CircularProgress } from "@mui/material";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const removeBookedClass = (id) => {
    const updatedClasses = classes.filter((gymClass) => gymClass._id !== id);
    console.log(updatedClasses);
    setClasses(updatedClasses);
  };

  const fetchClassesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url;
      if (authCtx.isLoggedIn) {
        url = "/clients/availableClasses";
      } else {
        url = "/classes";
      }
      const response = await fetch(url, {
        headers: {
          Authorization: authCtx.isLoggedIn ? authCtx.token : "",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedClasses = [];

      for (const key in data) {
        loadedClasses.push({
          _id: data[key]._id,
          name: data[key].name,
          price: data[key].price,
          trainer: data[key].trainer.first_name,
          capacity: data[key].capacity,
          date: data[key].date,
        });
        console.log(data[key].trainer);
      }

      setClasses(loadedClasses);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [authCtx.isLoggedIn, authCtx.token]);

  useEffect(() => {
    fetchClassesHandler();
  }, [fetchClassesHandler]);

  let content = (
    <Typography
      sx={{ fontSize: 25, fontWeight: "bold" }}
      color="white"
      textAlign="center"
      gutterBottom
    >
      Found no classes.
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
        CLasses
      </Typography>
      {classes.length > 0 && (
        <Grid container rowSpacing={3} justifyContent="center">
          {classes.map((element, index) => (
            <Grid item key={index}>
              <ClassCard
                {...element}
                removeBookedClassHandler={removeBookedClass}
                mappedFrom="classes"
              />
            </Grid>
          ))}
        </Grid>
      )}
      {classes.length <= 0 && <div>{content} </div>}
    </Container>
  );
}
