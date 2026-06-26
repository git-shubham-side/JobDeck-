const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.get("/", (req, res) => {
  res.json("Server is listening on *");
});

app.listen(3000, () => {
  console.log("server is running");
});
module.exports = app;
