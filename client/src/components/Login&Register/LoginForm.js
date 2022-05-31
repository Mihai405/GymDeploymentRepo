import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#525252",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //validation

    fetch("/users/login", {
      method: "PATCH",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Login failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.token, data.user.role, data.user.first_name);
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
        Log in
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
                    id="email"
                    label="E-mail"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={emailInputRef}
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
              <Grid item xs={3.5} height={1} minWidth={300}>
                <Item>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={passwordInputRef}
                  />
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
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
