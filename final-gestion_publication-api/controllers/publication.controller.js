const db = require("../models");
const Publication = db.publications;

// Créer et sauvegarder une nouvelle publication
exports.create = (req, res) => {

    // Valider la requete
    if (!req.body.title) {
        res.status(400).send({ message: "Le contenu ne peut pas etre vide!" });
        return;
    }

    // Créer une publication
    const publication = new Publication({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //Sauvegarder Publication dans la BD
    publication
        .save(publication)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Des erreurs sont survenues lors de la création de la publication."
            });
        });

};

// Recupérer les publications dans la BD.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Publication.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Des erreurs sont survenues lors de la récupération des publications."
            });
        });
};

// Rechercher une Publication grace à l'id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Publication.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Nous n'avons pas trouvé un epublication avec l'id:" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Une erreur est survenue lors de la récupération de la publication avec l'id:" + id });
        });
};

// MAJ Publication avec id grace a la requete
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas etre vide!"
        });
    }
    const id = req.params.id;
    Publication.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de mettre à jour la publication avec l'id: ${id}. Peut-etre que la publication est introuvable!`
                });
            } else res.send({ message: "La publication a été mis à jour avec succés." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Une erreur est survenue lors de la mise à jour de la publication avec l'id:" + id
            });
        });
};

// Supprimer Publication avec id dans la requete
exports.delete = (req, res) => {
    const id = req.params.id;
    Publication.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de supprimer la publication avec l'id: ${id}. Peut-etre que la publication est introuvable!`
                });
            } else {
                res.send({
                    message: "La publication a été supprimée avec succés!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer la publication avec l'id:" + id
            });
        });
};
// Supprimer toutes les Publications de la BD.
exports.deleteAll = (req, res) => {
    Publication.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} publications ont été supprimées avec succés!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Des erreurs sont survenues lors de la suppression des publications."
            });
        });
};
// Recuperer toutes les Publications publiées
exports.findAllPublished = (req, res) => {
    Publication.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Des erreurs sont survenues lors de la récupération des publications."
            });
        });
};