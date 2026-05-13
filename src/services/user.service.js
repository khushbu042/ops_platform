const { User} = require("../models");


// GET service
exports.getAllUser = async () => {
  return "khushbu";
};

// POST Service
exports.createUser = async (data) => {
  return await User.create(data);
};