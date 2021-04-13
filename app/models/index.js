const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.max,
      min: dbConfig.min,
      acquired: dbConfig.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorial = require("./tutorial.model")(sequelize, Sequelize); //Cria tabela totorial no MySQL
module.exports = db;
