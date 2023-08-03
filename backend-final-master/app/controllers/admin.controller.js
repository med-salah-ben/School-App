const db = require("../models");
const bcrypt = require("bcrypt");
const Admin = db.admins;
const Student = db.students;
const Classe = db.classs;
const Parent = db.parents;
const Professor = db.professors;
const twilio = require("twilio");
const {
  accountSid,
  authToken,
  twilioPhoneNumber,
} = require("../config/twilioConfig");
const client = twilio(accountSid, authToken);

// Create a admin account
exports.create = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  thePassword = await bcrypt.hash(req.body.password, salt);

  const admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: thePassword,
  });

  admin
    .save(admin)
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

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      const validated = await bcrypt.compare(password, admin.password);
      if (validated) {
        res.status(200).json({ message: "sucess login" });
      } else {
        res.status(404).json({ message: "Wrong credentials" });
      }
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllStudents = async (req, res) => {
  Student.find()
    .populate({ path: "parent", select: "email phoneNumber" })
    .populate("classe", "name")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};

exports.assigneStudentToClasse = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    const student = await Student.findById(studentId).populate({
      path: "parent",
      select: "email phoneNumber",
    });
    const classe = await Classe.findById(classId);

    if (!student || !classe) {
      return res.status(404).json({ message: "Student or class not found" });
    }

    student.classes = classe._id;
    await student.save();

    const phoneNumber = student.parent.phoneNumber; // Replace with the recipient's phone number
    const message = `We are pleased to inform you that your child ${student.nom} ${student.prenom} has been successfully registered in Class ${classe.name} . Classes will commence on 14 septembre.`; // Replace with your desired message

    res
      .status(200)
      .json({ message: "Student assigned to the class successfully" });
    await sendSMS(phoneNumber, message);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// active ParentAccount
exports.activeParentAccount = async (req, res) => {
  try {
    const parentId = req.body.parentId;
    const parent = await Parent.findByIdAndUpdate(
      parentId,
      { isAccepted: true },
      { new: true }
    );

    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    const phoneNumber = parent.phoneNumber; // Replace with the recipient's phone number
    const message = `We are pleased to inform you that your account with MySchool has been successfully activated. You can now log in to our system using the credentials you provided during registration.`; // Replace with your desired message

    res.json({ message: "Parent account activated" });
    await sendSMS(phoneNumber, message);
  } catch (error) {
    res.status(500).json({ error: "Could not activate parent account" });
  }
};

// send sms
async function sendSMS(to, body) {
  try {
    await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    });

    console.log("SMS sent successfully.");
  } catch (err) {
    console.error("Error sending SMS:", err.message);
  }
}

// find all parent accounts
exports.getAllParentAccounts = async (req, res) => {
  Parent.find({}, "-password")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};

// find all professor accounts
exports.getAllProfessorAccounts = async (req, res) => {
  Professor.find({}, "-password")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};

// add class to professor
exports.assigneClasseToProfessor = async (req, res) => {
  try {
    const { professorId, classId } = req.body;

    const professor = await Professor.findById(professorId);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    const assignedClass = await Classe.findById(classId);
    if (!assignedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    professor.classes = assignedClass._id;
    await professor.save();

    return res.json({ message: "Class assigned to professor successfully" });
  } catch (error) {
    console.error("Error assigning class to professor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// add deleted Parent Account
exports.deletedParentAccount = async (req, res) => {

    try {
   

      const { parentId } = req.body;
      const deletedParent = await Parent.findByIdAndDelete(parentId);
  
      if (!deletedParent) {
        return res.status(404).json({ message: "Parent account not found." });
      }
  
      return res.json({ message: "Parent account deleted successfully." });
    } catch (error) {
      console.error("Error deleting parent account:", error);
      return res.status(500).json({ message: "Server error." });
    }
};