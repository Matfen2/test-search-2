const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "Matfen",
  password: "Geralt2077!",
  database: "trip",
});

db.connect((error) => {
  if (error) {
    console.log("Erreur de la connection avec la base de données !");
  } else {
    console.log("Succès de la connection avec la base de données !");
  }
});

app.listen(PORT, () => {
  console.log("Connection dans le port serveur : " + PORT);
});

// Route pour récupérer tous les jeux avec un titre similaire
app.get("/games/:title", (req, res) => {
  const title = req.params.title;

  let qr = `SELECT * FROM games WHERE title LIKE ?`;

  db.query(qr, [`%${title}%`], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
    if (result.length > 0) {
      res.send({
        message: "get titles success",
        data: result,
      });
    } else {
      res.send({
        message: "get titles error",
      });
    }
  });
});
