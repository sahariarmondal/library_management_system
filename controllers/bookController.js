// const { Book } = require("../models/association.js");
const Book = require("../models/book");
const Author = require("../models/author");
const BookCopy = require("../models/book_copy");
const { Op } = require('sequelize');
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



const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }

    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%` // case-insensitive partial match
        }
      }
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found with that title" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books by title:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//Need to work on this function
const getAllBooksWithAuthorAndCopies = async (req, res) => {
  try {
    const { author, genre, status } = req.query;

    const where = {};
    if (author) where['$authors.first_name$'] = { [Op.iLike]: `%${author}%` };
    if (genre) where.genre = genre;
    if (status) where['$book_copies.availability_status$'] = status;

    const books = await Book.findAll({
      where,
      include: [
        { model: Author, as: 'authors', attributes: ['first_name'] },
        { model: BookCopy, as: 'copies', attributes: ['availability_status'] },
      ],
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






module.exports = {
  addBook, getBookByTitle, getAllBooksWithAuthorAndCopies
};
