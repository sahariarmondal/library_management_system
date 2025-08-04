const { Author } = require('../models/author.js');

//For creating a new author
const createAuthor = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const author = await Author.create({ first_name, last_name, email });

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For getting all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAuthor = async (req, res)=> {
    const { id } = req.params;
    const {first_name, last_name, email} = req.body;
    if (!id) {
      return res.status(400).json({ message: "Author ID is required" });
    }
    if(first_name || last_name || email) {
      return res.status(400).json({ message: "At least one field is required for update" });
    }
    try{
        const[updated] = await Author.update(
            { first_name, last_name, email },
            { where: { auth_id: id } }
        );
        if (updated != 0 ) {
            const updatedAuthor = await Author.findByPk(id);
            return res.status(200).json({ message: "Author updated successfully", data: updatedAuthor });
        }
        throw new Error("Author not found");
    }
    catch (error) {
        console.error("Error updating author:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
  createAuthor,
  getAllAuthors,
 updateAuthor
};


