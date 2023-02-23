const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});
app.use(express.json());
app.use(routes)

module.exports = app;
