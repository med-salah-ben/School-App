const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.parents = require("./parent.js")(mongoose);
db.professors = require("./professor.js")(mongoose);
db.students = require("./student.js")(mongoose);
db.classs = require("./classe.js")(mongoose);
db.admins = require("./admin")(mongoose);

module.exports = db;
