const Book = require("../models/book");
const Author = require("../models/author");
const BookAuthor = require("../models/book_author");

const createBookAuthorMapping = async (book_id, author_ids_input) => {
  const author_ids = Array.isArray(author_ids_input)
    ? author_ids_input
    : [author_ids_input];

 
  const book = await Book.findByPk(book_id);
  if (!book) {
    throw new Error("Book not found");
  }

  const existingMappings = await BookAuthor.findOne({ where: { book_id } });
  if (existingMappings) {
    throw new Error("This book already has author mapping can not add more.");
  }

 
  const authors = await Author.findAll({
    where: {
      auth_id: author_ids
    }
  });

  // Validation: all author_ids must exist
  if (authors.length !== author_ids.length) {
    throw new Error("One or more author IDs are invalid");
  }

  // Create all mappings
 const createdMappings = await Promise.all(
  author_ids.map(auth_id =>
    BookAuthor.findOrCreate({
      where: { book_id, auth_id }
    })
  )
);

  return createdMappings;
};

module.exports = createBookAuthorMapping
