import * as React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/system";
import { useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";

const JoinButton = styled(Button)({
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

function GymCard({ name, _id, removeJoinedGymHandler, mappedFrom }) {
  const authCtx = useContext(AuthContext);

  const joinGymHandler = useCallback(async () => {
    try {
      const response = await fetch(`/gyms/${_id}/trainers`, {
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
      removeJoinedGymHandler(_id);
      return data;
    } catch {}
  }, [authCtx.token, _id, removeJoinedGymHandler]);
  return (
    <Container>
      <Card sx={{ maxWidth: 330, backgroundColor: "text.primary" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 25, fontWeight: "bold" }}
            color="white"
            textAlign="center"
            gutterBottom
          >
            {name}
          </Typography>
          <CardMedia
            component="img"
            height="300"
            image={`/gyms/${_id}/image`}
          />
        </CardContent>
        {authCtx.role === "TRAINER" && mappedFrom !== "MyGyms" && (
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <JoinButton onClick={joinGymHandler}>Join</JoinButton>
          </CardActions>
        )}
      </Card>
    </Container>
  );
}

export default GymCard;
