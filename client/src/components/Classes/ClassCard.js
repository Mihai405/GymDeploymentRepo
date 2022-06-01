import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";

const BookButton = styled(Button)({
  backgroundColor: "red",
  color: "white",
  "&:hover": {
    backgroundColor: "red",
  },
  "&:disabled": {
    color: "white",
    backgroundColor: "grey",
  },
});

export default function ClassCard({
  name,
  price,
  trainer,
  capacity,
  date,
  _id,
  removeBookedClassHandler,
  mappedFrom,
}) {
  const disableBook = capacity === 0 ? true : false;
  const authCtx = useContext(AuthContext);
  console.log(trainer);

  const bookClassHandler = useCallback(async () => {
    try {
      const response = await fetch(`/classes/${_id}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      removeBookedClassHandler(_id);
      return data;
    } catch {}
  }, [authCtx.token, _id, removeBookedClassHandler]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateNewFormat = new Date(date).toLocaleDateString("en-US", options);
  return (
    <Container>
      <Card sx={{ maxWidth: 260, border: 1, borderColor: "white" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="170"
          image={`/classes/${_id}/image`}
        />
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography gutterBottom variant="h5">
                {name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Typography variant="subtitle1" color="text.primary">
                Price: {price}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Typography variant="subtitle1" color="text.primary">
                Capacity: {capacity}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Typography variant="subtitle1" color="text.primary">
                Trainer: {trainer}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Typography variant="subtitle1" color="text.primary">
                Date: {dateNewFormat}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          {mappedFrom === "classes" && (
            <BookButton onClick={bookClassHandler} disabled={disableBook}>
              {disableBook ? "Full capacity" : "Book Membership"}
            </BookButton>
          )}
          {mappedFrom === "myClasses" && (
            <BookButton
              onClick={bookClassHandler}
              disabled={disableBook}
              style={{ backgroundColor: "green" }}
            >
              Booked
            </BookButton>
          )}
        </CardActions>
      </Card>
    </Container>
  );
}
