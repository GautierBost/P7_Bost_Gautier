const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model("Publication", publicationSchema);
