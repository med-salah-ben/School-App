module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role:{ type: String, default:"Admin" },
    },
    { timestamps: true }
  );

  const Admin = mongoose.model("Admin", schema);
  return Admin;
};
