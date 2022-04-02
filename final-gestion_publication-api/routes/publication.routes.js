module.exports = app => {
  const publications = require("../controllers/publication.controller.js");
  var router = require("express").Router();
  // Creer une Publication
  router.post("/", publications.create);
  // Recuperer toutes les Publications
  router.get("/", publications.findAll);
  // Recuperer les publications publiées
  router.get("/published", publications.findAllPublished);
  // Recuperer une Publication avec id
  router.get("/:id", publications.findOne);
  // MAJ Publication avec id
  router.put("/:id", publications.update);
  // Supprimer une Publication avec id
  router.delete("/:id", publications.delete);
  // Supprimer toutes les Publications
  router.delete("/", publications.deleteAll);
  app.use('/api/publications', router);
};
