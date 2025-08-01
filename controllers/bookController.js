// const { Book } = require("../models/association.js");
const Book = require("../models/book");
// Controller to add a new book
const addBook = async (req, res) => {
  try {
    const {
      book_id,
      title,
      isbn,
      genre,
      published_year,
      language,
    } = req.body;

    // Basic input validation
    if (!book_id || !title || !isbn || !genre) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const book = await Book.create({
      book_id,
      title,
      isbn,
      genre,
      published_year,
      language
    });

    return res.status(201).json({
      message: "Book added successfully",
      data: book,
    });

  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  addBook
};
