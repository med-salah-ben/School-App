module.exports = (app) => {
  const parents = require("../controllers/parent.controller.js");

  var router = require("express").Router();

  // Create a parent account
  router.post("/register", parents.create);

  // Parent login
  router.post("/login", parents.login);

  // Register a student
  router.post("/register/student", parents.register);

  app.use("/api/parents", router);
};
