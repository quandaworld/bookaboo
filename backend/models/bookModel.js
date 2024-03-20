import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);