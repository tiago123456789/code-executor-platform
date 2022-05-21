require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const routesApp = require("../routes/index");

app.use(express.json());
app.use(cors("*"));

routesApp(app)

module.exports = app;


