module.exports = (app) => {
  const admins = require("../controllers/admin.controller");
  const classes = require("../controllers/classe.controller");

  var router = require("express").Router();

  // Create a admin account
  router.post("/register", admins.create);

  // Admin login
  router.post("/login", admins.login);

  // Create classe
  router.post("/create/classe", classes.create);

  // get all classe
  router.get("/findAllClasse", classes.getAllClasses);

  // get all classe
  router.get("/findAllStudends", admins.getAllStudents);

  // Student assigned to the class
  router.post("/addStudendToClasse", admins.assigneStudentToClasse);

  // active parent account
  router.post("/activeParentAccount", admins.activeParentAccount);

  // find all parent account
  router.get("/getAllParentAccounts", admins.getAllParentAccounts);

  // find all professor account
  router.get("/getAllProfessorAccounts", admins.getAllProfessorAccounts);

  //  add class to professor
  router.post("/addClasseToProfessor", admins.assigneClasseToProfessor);

   //  delete Parent Account
   router.post("/deleteParentAccount", admins.deletedParentAccount);

  app.use("/api/admins", router);
};
