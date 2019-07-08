const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  displayName: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    unique: 1
  },
  email: {
    type: String,
    unique: 1
  }
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
