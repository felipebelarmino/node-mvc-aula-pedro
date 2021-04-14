const db = require("../models");

Locatario = db.locatario;

const Op = db.sequelize.Op; //Redução de código

exports.create = (req, res) => {
  //Validar model
  if (!req.body.title) {
    res.status(400).send({ message: "Falta o título do locatario!" });
    return;
  }
  const locatario = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  Locatario.create(locatario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro interno ao criar o locatario!" });
    });
};

//----------------------------------------------------------------
exports.findAll = (req, res) => {
  Locatario.findAll({ where: null })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro interno!" });
    });
};

//----------------------------------------------------------------
exports.findAllPublished = (req, res) => {
  Locatario.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro interno!" });
    });
};

//----------------------------------------------------------------
exports.findOne = (req, res) => {
  Locatario.findByPk(req.params.id)
    .then((data) => {
      if (!data) {
        return res.send({ message: "ID não encontrado!"});
      } else {
        return res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao buscar o id ${req.params.id}`,
      });
    });
};

//----------------------------------------------------------------
exports.updateLocatario = (req, res) => {
  const id = req.params.id;

  Locatario.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        return res.send({ message: "Locatarios atualizado." });
      } else {
        return res.send({
          message: `Não foi possível atualizar o locatario ${id}, não encontrado ou vazio.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Erro interno de servidor ao tentar atualizar o id ${id}.`,
      });
    });
};

//----------------------------------------------------------------
exports.deleteLocatario = (req, res) => {
  const id = req.params.id;

  Locatario.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        return res.send({ message: "Locatarios deletado." });
      } else {
        return res.send({
          message: `Não foi possível deletar o locatario ${id}, não encontrado ou vazio.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Erro interno de servidor ao tentar atualizar o id ${id}.`,
      });
    });
};

//-------------------------------
exports.deleteAll = (_req, res) => {
  Locatario.destroy({ 
    where: {}, 
    truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Locatarios deletados!` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || `Erro interno de servidor` });
    });
};
