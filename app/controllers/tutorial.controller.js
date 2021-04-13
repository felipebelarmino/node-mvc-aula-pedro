const db = require("../models");

Tutorial = db.tutorial;

const Op = db.sequelize.Op; //Redução de código

exports.create = (req, res) => {
  //Validar model
  if (!req.body.title) {
    res.status(400).send({ message: "Falta o título do tutorial!" });
    return;
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro interno ao criar o tutorial!" });
    });
};
