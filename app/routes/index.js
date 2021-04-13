module.exports = (app) => {
  const tutorial = require("../controllers/tutorial.controller");
  let router = require("express").Router();
  router.post("/", tutorial.create);
  app.use("/api/tutorial", router);
};
