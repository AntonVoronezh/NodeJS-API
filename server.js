const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let artists = [
  { id: 1, name: "Metallica" },
  { id: 2, name: "Iron Maiden" },
  { id: 3, name: "Deep Purple" }
];

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/artists", (req, res) => {
  res.send(artists);
});


