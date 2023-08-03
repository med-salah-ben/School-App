module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      professor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
      }],
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
    { timestamps: true }
  );
  

  const Classe = mongoose.model("Classe", schema);
  return Classe;
};
