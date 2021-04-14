module.exports = (sequelize, Sequelize) => {
  const locatario = sequelize.define("locatario", {
    nome: {
      type: Sequelize.STRING,
    },
    cpf: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });
  return locatario;
};
