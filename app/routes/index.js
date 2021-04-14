module.exports = (app) => {
  const livro = require("../controllers/livro.controller");

  const locatario = require("../controllers/locatario.controller");

  let router = require("express").Router();

  //Rotas livro
  router.post("/livro", livro.create);
  router.get("/livro", livro.findAll);
  router.get("/livro/published", livro.findAllPublished);
  router.delete("/livro/delete-all", livro.deleteAll);
  router.get("/livro/:id", livro.findOne);
  router.put("/livro/:id", livro.updatelivro);
  router.delete("/livro/:id", livro.deletelivro);
  

  //Rotas locatario
  router.post("/locatario", locatario.create);
  router.get("/locatario", locatario.findAll);
  router.get("/locatario/status", locatario.findAllPublished);
  router.delete("/locatario/delete-all", locatario.deleteAll);
  router.get("/locatario/:id", locatario.findOne);
  router.put("/locatario/:id", locatario.updateLocatario);
  router.delete("/locatario/:id", locatario.deleteLocatario);

  app.use("/api", router);
};
