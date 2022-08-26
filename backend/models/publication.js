const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  creationDate: { type: Number, required: true },
  modificationDate: { type: Number, required: false },
});

module.exports = mongoose.model("Publication", publicationSchema);
