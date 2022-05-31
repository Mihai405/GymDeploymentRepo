//require("dotenv").config();
const path = require("path");
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

const clientsRouter = require("./routes/clients");
app.use("/clients", clientsRouter);

const trainersRouter = require("./routes/trainers");
app.use("/trainers", trainersRouter);

const classesRouter = require("./routes/gymClasses");
app.use("/classes", classesRouter);

const gymsRouter = require("./routes/gyms");
app.use("/gyms", gymsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log("Server started on port " + port));
