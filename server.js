const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Mini-projet TechJS Gestion de publication de RATSARATANY Michael et RAHARISON Rado" });
});
//Connexion
const db = require("./final-gestion_publication-api/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Nous sommes connectés à la base de données!");
  })
  .catch(err => {
    console.log("Nous ne pouvons pas nous connecter à la base de données!", err);
    process.exit();
  });
//routes
require("./final-gestion_publication-api/routes/publication.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});
