module.exports = (sequelize, Sequelize) => {
  const livro = sequelize.define("livro", {
    nome: {
      type: Sequelize.STRING,
    },
    autor: {
      type: Sequelize.STRING,
    },
    sinopse: {
      type: Sequelize.TEXT,
    },
    lancamento: { 
      type: Sequelize.DATEONLY,
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
