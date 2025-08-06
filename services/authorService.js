const Author = require("../models/author");
const Book = require("../models/book");

const addAuthors = async (authorsData) => {
  try {
    const authorsToCreate = Array.isArray(authorsData)
      ? authorsData
      : [authorsData];

    const createdAuthors = await Author.bulkCreate(authorsToCreate);

    return {
      success: true,
      message: `No of Author Created: ${createdAuthors.length}`,
      data: createdAuthors,
    };
  } catch (err) {
    throw new Error(`Failed to create Authors : ${err.message}`);
  }
};

// const getBooksByAuthorId = async (authorId) => {
//   try {
//     const authorWithBooks = await Author.findByPk(authorId, {
//       include: [
//         {
//           model: Book,
//           as: "books",
//           through: { attributes: [] },
//         },
//       ],
//     });

//     return{
//         message: "Details Fetched Successfully",
//         data: authorWithBooks
//     }
//   } catch (err) {
//      throw new Error(`Failed to fetch the author with their books : ${err.message}`);
//   }
// };

const getBooksByAuthorId = async (authorId) => {
  try {
    const authorWithBooks = await Author.findByPk(authorId, {
      include: [
        {
          model: Book,
          as: "books",
          through: { attributes: [] },
        },
      ],
    });

    return {
      message: "Author and books fetched successfully",
      data: authorWithBooks,
    };

  } catch (err) {
    throw new Error(`Failed to fetch author with their books: ${err.message}`);
  }
};


module.exports = {
  addAuthors,
  getBooksByAuthorId
};
