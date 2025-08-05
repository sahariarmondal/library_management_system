const bookService = require("../services/bookService.js");

const addBookController = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);

    return res.status(201).json({
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error adding book:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

const getBookByTitleController = async (req, res) => {
  try {
    const { title } = req.query;

    const books = await bookService.getBookByTitle(title);

    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found with that title" });
    }

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error in fetching books by title:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await bookService.deleteBookById(id);

    return res.status(202).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookController = async (req, res) => {
  try{
    const {id } = req.params;
    const updatedData = req.body;
    if(!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Updated field is empty"
      });
    }
    const result = await bookService.updateBookById(id, updatedData);

    return res.status(200).json({
      success : true,
      message: result.message,
      data: result.data
    });

  }
  catch(error){
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

const addBookWithAuthorsController = async(req, res) => {
  try{
    const {bookData, authorIds} = req.body;
    if(!bookData){
      throw new Error("Book data is missing");
    }

    const result = await bookService.addBookWithAuthors(bookData, authorIds);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result.data
    });
  }
  catch(err){
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

const getBookByFullTitleWithAuthorsController = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const data = await bookService.getBookByFullTitleWithAuthors(title);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No book found with the given title",
      });
    }

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};


module.exports = {
  addBookController,
  getBookByTitleController,
  deleteBookByIdController,
  updateBookController,
  addBookWithAuthorsController,
  getBookByFullTitleWithAuthorsController
};
