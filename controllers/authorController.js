const authorService = require("../services/authorService");

const addAuthorsController = async (req, res) => {
  try {
    const authors = req.body.authors;
    if (!authors) {
      throw new Error("Author Details is Missing");
    }
    const addedAuthors = await authorService.addAuthors(authors);
    res.status(201).json({
      success: addedAuthors.success,
      message: addedAuthors.message,
      data: addedAuthors.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addAuthorsController,
};
