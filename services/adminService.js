const  Admin  = require("../models/admin");

const createAdmin = async (adminData, transaction) => {
  return await Admin.create(adminData, { transaction });
};


const getAdminIdByUserId = async (user_id) => {
  try {
    const admin = await Admin.findOne({
      where: { user_id },
      attributes: ["admin_id"]
    });

    if (!admin) {
      throw new Error("No Admin exists with this UserId");
    }

    return admin.admin_id;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAdminIdByUserId };


module.exports = {
  createAdmin,
  getAdminIdByUserId
};
