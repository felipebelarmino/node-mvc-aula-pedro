const db = require("../models");

Livro = db.livro;

const Op = db.Sequelize.Op; //Redução de código

exports.create = (req, res) => {
  //Validar model
  if (
    !req.body.nome ||
    !req.body.autor ||
    !req.body.sinopse ||
    !req.body.lancamento ||
    !req.body.dataAluguel
    ) {
    res.status(400).send({ message: "Faltam dados do livro!" });
    return;
  }
  const livro = {
    nome: req.body.nome,
    autor: req.body.autor,
    sinopse: req.body.sinopse,
    lancamento: req.body.lancamento,
    dataAluguel: req.body.dataAluguel,
    status: req.body.status ? req.body.status : false,
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

  const autor = req.query.autor;

  let condition = autor ? { autor: {[Op.like]: `%${autor}%`}} : null;

  Livro.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erro interno!" });
    });
};

//----------------------------------------------------------------
exports.findAllLocated = (_req, res) => {
  Livro.findAll({ where: { status: true } })
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
      res.send({ message: `${nums} livros deletados!` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || `Erro interno de servidor` });
    });
};
