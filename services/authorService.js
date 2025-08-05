const sequelize = require("../config/db_config");
const Author = require("../models/author");


const addAuthors = async(authorsData)=>{

    try{
        const authorsToCreate = Array.isArray(authorsData) ? authorsData : [authorsData];

        const createdAuthors = await Author.bulkCreate(authorsToCreate);

        return{
            success: true,
            message: `No of Author Created: ${createdAuthors.length}`,
            data: createdAuthors,
        }
    }
    catch(err){
        throw new Error(`Failed to create Authors : ${err.message}`);
    }
}

module.exports = {
    addAuthors
}