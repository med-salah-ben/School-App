module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true },
      password: { type: String, required: true },
      isAccepted: { type: Boolean, default: false },
      role:{ type: String, default:"Parent" },
    },
    { timestamps: true }
  );

  const Parent = mongoose.model("Parent", schema);
  return Parent;
};
