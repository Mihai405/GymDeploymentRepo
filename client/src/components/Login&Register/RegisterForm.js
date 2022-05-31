import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#525252",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RegisterForm() {
  const navigate = useNavigate();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const [role, setRole] = useState("CLIENT");
  const imageInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const payload_data = {
      first_name: firstNameInputRef.current["value"],
      last_name: lastNameInputRef.current["value"],
      email: emailInputRef.current["value"],
      phone: phoneInputRef.current["value"],
      password: passwordInputRef.current["value"],
      role: role,
      image: imageInputRef.current.files[0],
    };

    let formData = new FormData();
    for (let key in payload_data) {
      if (payload_data[key]) {
        formData.append(key, payload_data[key]);
      }
    }

    fetch("/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Register failed!";
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
        Sign up
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
              <Grid item xs={2.5} height={1} minWidth={150}>
                <Item>
                  <TextField
                    id="first-name"
                    label="First Name"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={firstNameInputRef}
                  />
                </Item>
              </Grid>

              <Grid item xs={2.5} height={1} minWidth={150}>
                <Item>
                  <TextField
                    id="last-name"
                    label="Last Name"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={lastNameInputRef}
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
              <Grid item xs={5} height={1} minWidth={300}>
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
              <Grid item xs={2.5} height={1} minWidth={150}>
                <Item>
                  <TextField
                    id="phone"
                    label="Phone number"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={phoneInputRef}
                  />
                </Item>
              </Grid>
              <Grid item xs={2.5} height={1} minWidth={150}>
                <Item>
                  <TextField
                    id="password"
                    type="password"
                    label="Password"
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
            <Grid container spacing={2} marginTop={1} justifyContent="center">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={role}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="CLIENT"
                  control={<Radio sx={{ color: "white" }} />}
                  label="Client"
                  sx={{
                    color: "white",
                    mx: 4,
                  }}
                />
                <FormControlLabel
                  value="TRAINER"
                  control={<Radio sx={{ color: "white" }} />}
                  label="Trainer"
                  sx={{
                    color: "white",
                    mx: 4,
                  }}
                />
              </RadioGroup>
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
                    <input type="file" ref={imageInputRef} hidden />
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
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
