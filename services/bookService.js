const sequelize = require("../config/db_config");
const Author = require("../models/author");
const Book = require("../models/book");
const { Op } = require("sequelize");

//FUNCTION TO ADD THE BOOK
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

//FUNCTION TO DELETE A BOOK BY ID
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

//SERVICE TO DELETE A BOOK
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

//FUNCTION TO UPDATE THE BOOKS
const updateBookById = async (id, updatedData) => {
  if (!id) {
    throw new Error("Book ID is required for Update");
  }
  const bookToBeUpdated = await Book.findByPk(id);
  if (!bookToBeUpdated) {
    throw new Error("Book ID is not valid");
  }
  const updatedBook = await bookToBeUpdated.update(updatedData);

  return {
    message: "Book Updated Successfully",
    data: updatedBook.toJSON(),
  };
};


//FUNCTION TO ADD THE BOOKS WITH AUTHORS
const addBookWithAuthors = async(bookDetails, authorsIds) => {
  const t = await sequelize.transaction();

  try{
    const newBook = await Book.create(bookDetails, {transaction: t});

     const authors = await Author.findAll({
      where: {
        auth_id : authorsIds
      },
      transaction: t,
     });

     if(authors.length !== authorsIds.length){
      throw new Error("Some Author Ids are Invalid");
     }

     await newBook.addAuthors(authors, {transaction: t});

     t.commit();

     return {
      message: "Book added with authors",
      data: newBook
     }
  }
  catch(error){
    await t.rollback();
    throw error;
  }
};

module.exports = {
  addBook,
  getBookByTitle,
  deleteBookById,
  updateBookById,
  addBookWithAuthors
};
