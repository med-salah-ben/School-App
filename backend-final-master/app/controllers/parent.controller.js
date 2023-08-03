const db = require("../models");
const bcrypt = require("bcrypt");
const Parent = db.parents;
const Student = db.students;

// Create a parent account
exports.create = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  thePassword = await bcrypt.hash(req.body.password, salt);

  const parent = new Parent({
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: thePassword,
  });

  parent
    .save(parent)
    .then((data) => {
      res.send({ message: "account created successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Parent login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const parent = await Parent.findOne({ username: username });
    if (parent) {
      const activeAccount = parent.isAccepted;

      if (activeAccount === true) {
        const validated = await bcrypt.compare(password, parent.password);
        if (validated) {
          res.status(200).json({ message: "sucess login"  , parent : parent});
        } else {
          res.status(404).json({ message: "Wrong credentials" });
        }
      } else {
        res.status(404).json({ message: "Account non active" });
      }
    } else {
      res.status(404).json({ message: "Parent not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register a student
exports.register = async (req, res) => {
  const { email } = req.body;

  const parent = await Parent.findOne({ email: email });
  if (!parent) {
    return res.status(404).json({ message: "Parent not found" });
  }

  const student = new Student({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    parent: parent._id,
  });

  student
    .save(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
