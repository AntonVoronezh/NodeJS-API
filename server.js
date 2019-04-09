const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
let db;

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

app.get("/artists/:id", (req, res) => {
  // console.log(req.params);
  const artist = artists.find(artist => artist.id === Number(req.params.id));
  res.send(artist);
});

app.post("/artists", (req, res) => {
  const artist = {
    // id: Date.now(),
    name: req.body.name
  };
  // artists.push(artist);
  // console.log(req.body);
  // res.send(artist);
  db.collection('artists').insert(artist, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(artist);
  });
});

app.put("/artists/:id", (req, res) => {
  const artist = artists.find(artist => artist.id === Number(req.params.id));
  artist.name = req.body.name;
 return res.sendStatus(200);
});

app.delete("/artists/:id", (req, res) => {
  artists = artists.filter(artist => artist.id !== Number(req.params.id));
  res.sendStatus(200);
});

MongoClient.connect("mongodb://localhost:27017/myapi", (err, database) => {
  if (err) {
    console.log(err);
  }

  db = database;

  app.listen(3012, () => {
    console.log("API app started");
  });
});
// net start MongoDB