const sequelize = require("../config/db_config");
const Author = require("../models/author");
const Book = require("../models/book");
const BookCopy = require("../models/book_copy");
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


//FUNCTION TO ADD THE BOOKS WITH AUTHORS AND COPY ID WILL AUTOMATICALLY GENERATED
const addBookWithAuthors = async(bookDetails, authorsIds) => {
  const t = await sequelize.transaction();
  if(authorsIds.length === 0) {
    throw new Error("Enter some valid author Ids");
  }
  try{
    const newBook = await Book.create(bookDetails, {transaction: t});

     const authors = await Author.findAll({
      where: {
        auth_id : authorsIds
      },
      transaction: t,
     });
     
     if(authors.length !== authorsIds.length){
      throw new Error("Some Author Ids are Invalid or Duplicate Authors");
     }

     await newBook.addAuthors(authors, {transaction: t});

     const quantity = bookDetails.total_copies || 1;

    if (quantity > 0) {
      const bookCopies = [];

      for (let i = 0; i < quantity; i++) {
        bookCopies.push({
          book_id: newBook.book_id
        });
      }

      await BookCopy.bulkCreate(bookCopies, { transaction: t });
    }

     t.commit();

     return {
      message: "Book added with authors and copies",
      data: newBook
     }
  }
  catch(error){
    await t.rollback();
    throw error;
  }
};



const getBookByFullTitleWithAuthors = async (title) => {
  try {
    const books = await Book.findAll({
      where: {
        title: {
          [Op.eq]: title   // Case-insensitive full match
        }
      },
      include: [
        {
          model: Author,
          as: 'authors',
          through: { attributes: [] },
          attributes: ['auth_id', 'first_name', 'last_name']
        }
      ]
    });

    return books;
  } catch (err) {
    throw new Error(`Failed to fetch books: ${err.message}`);
  }
};


module.exports = {
  addBook,
  getBookByTitle,
  deleteBookById,
  updateBookById,
  addBookWithAuthors,
  getBookByFullTitleWithAuthors
};
