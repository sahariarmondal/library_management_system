const  Admin  = require("../models/admin");

const createAdmin = async (adminData, transaction) => {
  return await Admin.create(adminData, { transaction });
};

module.exports = {
  createAdmin
};
