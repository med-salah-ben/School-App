const db = require("../models");
const bcrypt = require("bcrypt");
const Professor = db.professors;
const Classe = db.classs;

// Create a Professor account
exports.create = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  thePassword = await bcrypt.hash(req.body.password, salt);

  const professor = new Professor({
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: thePassword,
    isAccepted: false,
  });

  professor
    .save(professor)
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

// Professor login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const professor = await Professor.findOne({ username: username });
    if (professor) {
      const validated = await bcrypt.compare(password, professor.password);
      if (validated) {
        res.status(200).json({ message: "sucess login" });
      } else {
        res.status(404).json({ message: "Wrong credentials" });
      }
    } else {
      res.status(404).json({ message: "Professor not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get professor info data
exports.getProfessorInfo = async (req, res) => {
  try {
    const professorId = req.body.professorId;

    // Find the professor by ID
    const professor = await Professor.findById(professorId).select('-password').populate('classes');
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }
        
    res.json({ professor });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving professor and assigned classes' });
  }
};
