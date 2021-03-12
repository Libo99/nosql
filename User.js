const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = User = mongoose.model("User", userSchema);

