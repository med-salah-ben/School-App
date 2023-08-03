module.exports = (app) => {
  const professors = require("../controllers/professor.controller");

  var router = require("express").Router();

  // Create a professor account
  router.post("/register", professors.create);

  // professor login
  router.post("/login", professors.login);

    // get professor info
    router.post("/getProfessorInfo", professors.getProfessorInfo);

  app.use("/api/professors", router);
};
