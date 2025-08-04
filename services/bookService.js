const Book = require("../models/book");
const { Op } = require("sequelize");

const addBook = async (data) => {
  const { book_id, title, isbn, genre, published_year, language } = data;

  if (!book_id || !title || !isbn || !genre) {
    throw new Error("Required fields are missing");
  }

  const book = await Book.create({
    book_id,
    title,
    isbn,
    genre,
    published_year,
    language,
  });

  return book;
};

const getBookByTitle = async (title) => {
  if (!title) {
    throw new Error("Title query is required");
  }

  const books = await Book.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });

  return books;
};

const deleteBookById = async (id) => {
  if (!id) {
    throw new Error("Book ID is required for deletion of the book");
  }
  const bookToBeDeleted = await Book.findByPk(id);
  if (!bookToBeDeleted) {
    throw new Error("Book Id is not valid");
  }
  await bookToBeDeleted.destroy();
  return { message: "Book destroyed successfully" };
};

module.exports = {
  addBook,
  getBookByTitle,
  deleteBookById,
};
