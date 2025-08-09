const createBookAuthorMapping = require("../services/bookAuthorService");

const createBookAuthorMappingController = async (req, res) => {
  try {
    const { book_id, author_ids } = req.body;

    if (!book_id || !author_ids || !Array.isArray(author_ids) || author_ids.length === 0) {
      return res.status(400).json({ message: "book_id and non-empty author_ids array are required." });
    }

    const result = await createBookAuthorMapping(book_id, author_ids);
    res.status(201).json({ message: "Authors mapped to book successfully.", mappings: result });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports =  createBookAuthorMappingController ;
