import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AuthContext from "../../store/auth-context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#525252" : "#525252",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddClassForm() {
  const authCtx = useContext(AuthContext);
  const [gyms, setGyms] = useState([]);
  const fetchTrainersGymsHandler = useCallback(async () => {
    try {
      const response = await fetch("/trainers/gyms", {
        headers: { Authorization: authCtx.token },
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
      throw new Error(error.message);
    }
  }, [authCtx.token]);

  useEffect(() => {
    fetchTrainersGymsHandler();
  }, [fetchTrainersGymsHandler]);

  console.log(gyms.map((gym) => gym.name));

  const [gymSelected, setGymSelected] = useState("");

  const handleChange = (event) => {
    setGymSelected(event.target.value);
  };

  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const classNameInputRef = useRef();
  const priceInputRef = useRef();
  const capacityInputRef = useRef();
  // const dateInputRef = useRef();
  const imageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const payload_data = {
      name: classNameInputRef.current["value"],
      price: priceInputRef.current["value"],
      capacity: capacityInputRef.current["value"],
      date: value,
      image: imageInputRef.current.files[0],
    };

    let formData = new FormData();
    for (let key in payload_data) {
      if (payload_data[key]) {
        formData.append(key, payload_data[key]);
      }
    }

    fetch(`/gyms/${gymSelected}/classes`, {
      method: "POST",
      body: formData,
      headers: { Authorization: authCtx.token },
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
      .then((data) => {
        console.log(data);
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
        Add a new class
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
                    id="Class Name"
                    label="Class Name"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={classNameInputRef}
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
                    id="Price"
                    label="Price"
                    variant="standard"
                    fullWidth={true}
                    InputLabelProps={{
                      sx: { color: "#fff" },
                    }}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={priceInputRef}
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
                    id="Capacity"
                    label="Capacity"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: "#fff" },
                    }}
                    variant="standard"
                    fullWidth={true}
                    InputProps={{
                      sx: { color: "#fff" },
                    }}
                    inputRef={capacityInputRef}
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
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ color: "#fff" }}
                    >
                      Select Gym
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gymSelected}
                      label="Select Gym"
                      onChange={handleChange}
                      inputProps={{
                        sx: { color: "#fff" },
                      }}
                    >
                      {gyms.length > 0 &&
                        gyms.map((gym, index) => (
                          <MenuItem key={index} value={gym._id}>
                            {gym.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant={"standard"}
                          fullWidth={true}
                          {...params}
                          InputLabelProps={{
                            sx: { color: "#fff" },
                          }}
                          InputProps={{
                            sx: { color: "#fff" },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                  ADD CLASS
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
