module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      nom: { type: String },
      prenom: { type: String },
      age: { type: String },
      classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
      parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }, // Reference to Parent model
      role:{ type: String, default:"Student" },
    },
    { timestamps: true }
  );



  const Student = mongoose.model("Student", schema);
  return Student;
};
