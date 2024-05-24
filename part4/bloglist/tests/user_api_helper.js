const Users = require("../models/user");
const bcrypt = require("bcrypt");

const initialUser = async () => {
  return {
    username: "firstuser",
    name: "first",
    passwordHash: await bcrypt.hash("secret", 10),
  };
};

const getUsersInDb = async () => {
  const users = await Users.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUser,
  getUsersInDb,
};
