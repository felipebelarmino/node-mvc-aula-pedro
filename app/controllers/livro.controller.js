const db = require("../models");

Livro = db.livro;

const Op = db.sequelize.Op; //Redução de código

exports.create = (req, res) => {
  //Validar model
  if (!req.body.title) {
    res.status(400).send({ message: "Falta o título do livro!" });
    return;
  }
  const livro = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  Livro.create(livro)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro interno ao criar o livro!" });
    });
};

//----------------------------------------------------------------
exports.findAll = (req, res) => {
  Livro.findAll({ where: null })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro interno!" });
    });
};

//----------------------------------------------------------------
exports.findAllPublished = (req, res) => {
  Livro.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro interno!" });
    });
};

//----------------------------------------------------------------
exports.findOne = (req, res) => {
  Livro.findByPk(req.params.id)
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
exports.updatelivro = (req, res) => {
  const id = req.params.id;

  Livro.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        return res.send({ message: "livro atualizado." });
      } else {
        return res.send({
          message: `Não foi possível atualizar o livro ${id}, não encontrado ou vazio.`,
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
exports.deletelivro = (req, res) => {
  const id = req.params.id;

  Livro.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        return res.send({ message: "livro deletado." });
      } else {
        return res.send({
          message: `Não foi possível deletar o livro ${id}, não encontrado ou vazio.`,
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
  Livro.destroy({ 
    where: {}, 
    truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Tutoriais deletados!` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || `Erro interno de servidor` });
    });
};
