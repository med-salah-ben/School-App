const db = require("../models");
const Classe = db.classs;

// Create a classe
exports.create = async (req, res) => {
  const classe = new Classe({
    name: req.body.name,
  });

  classe
    .save(classe)
    .then((data) => {
      res.send({ message: "classe created successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// list of all classe

exports.getAllClasses = async (req, res) => {
  Classe.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};
