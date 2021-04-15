module.exports = (sequelize, Sequelize) => {
  const livro = sequelize.define("livro", {
    nome: {
      type: Sequelize.STRING,
    },
    autor: {
      type: Sequelize.STRING,
    },
    sinopse: {
      type: Sequelize.STRING,
    },
    lancamento: { 
      type: Sequelize.STRING,
    },
    dataAluguel: {
      type: Sequelize.DATEONLY,
    },
    status: {
      type: Sequelize.BOOLEAN,
    }
  });
  return livro;
};
