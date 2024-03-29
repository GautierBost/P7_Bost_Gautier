const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: {
    type: String,
    required: false,
    default: "http://localhost:3000/images/default-picture.jpg",
  },
  isAdmin: { type: Boolean, required: true, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
