module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true },
      password: { type: String, required: true },
      classes: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
      role:{ type: String, default:"Professor" },
    },
    { timestamps: true }
  );


  const Professor = mongoose.model("Professor", schema);
  return Professor;
};
