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

const getBooksByAuthorIdController = async (req, res) => {
  try {
    const authId = req.params.id;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "Author Id is missing",
      });
    }

    const result = await authorService.getBooksByAuthorId(authId);

    if (!result.data) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error encountered while fetching books for author: ${err.message}`,
    });
  }
};


module.exports = {
  addAuthorsController,
  getBooksByAuthorIdController,
};
