const db = require("./app/models");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./app/routes/index")(app);
app.get("/", (_req, res) => res.json({ message: "Avanade CRUD aluguel livraria!" }));
db.sequelize.sync();//{ force: true }
app.listen(process.env.PORT || 3000);
