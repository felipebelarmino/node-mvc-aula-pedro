module.exports = {
  hostname: "localhost",
  username: "root",
  password: "",
  database: "db_livros",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
};
