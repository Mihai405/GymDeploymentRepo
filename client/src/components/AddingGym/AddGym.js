import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#525252" : "#525252",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddGymForm() {
  const navigate = useNavigate();

  const gymNameInputRef = useRef();
  const imageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const payload_data = {
      name: gymNameInputRef.current["value"],
      image: imageInputRef.current.files[0],
    };

    console.log(payload_data);

    let formData = new FormData();
    for (let key in payload_data) {
      if (payload_data[key]) {
        formData.append(key, payload_data[key]);
      }
    }

    fetch(`/gyms`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Adding a class failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
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
        Add a new gym
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={submitHandler}>
          <Grid container>
            <Grid
              container
              spacing={2}
              marginBottom={1}
              justifyContent="center"
            >
              <Grid item xs={3.5} height={1} minWidth={300}>
                <Item>
                  <TextField
                    id="Gym Name"
                    label="Gym Name"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={gymNameInputRef}
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              marginBottom={1}
              justifyContent="center"
            >
              <Grid
                item
                xs={3.5}
                height={1}
                minWidth={300}
                justifyContent="center"
              >
                <Item sx={{ backgroundColor: "#0000" }}>
                  <Button variant="contained" component="label">
                    Upload Picture
                    <input type="file" hidden ref={imageInputRef} />
                  </Button>
                </Item>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              marginBottom={1}
              marginTop={3}
              justifyContent="center"
            >
              <Grid item xs={2.5} height={1} minWidth={300}>
                <Button variant="contained" fullWidth={true} type="submit">
                  ADD GYM
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
