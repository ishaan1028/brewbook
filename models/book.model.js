const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 2000,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema, "book");
