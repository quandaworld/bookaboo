import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Saving a new book
router.post('/', async (request, response) => {
  try {
    // Check book validation
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.format ||
      !request.body.pages ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, format, pages, status',
      })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      format: request.body.format,
      pages: request.body.pages,
      status: request.body.status,
      notes: request.body.notes,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Getting all books from db
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Getting one book from db by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Updating a book
router.put('/:id', async (request, response) => {
  try {
    // Check book validation
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.format ||
      !request.body.pages ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, format, pages, status',
      })
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Deleting a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;