module.exports = (sequelize, Sequelize) => {
  const locatario = sequelize.define("locatario", {
    nome: {
      type: Sequelize.STRING,
    },
    cpf: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });
  return locatario;
};
