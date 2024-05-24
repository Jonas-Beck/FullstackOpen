const bcrypt = require("bcrypt");
const usersRouters = require("express").Router();
const User = require("../models/user");

usersRouters.get("/", async (_request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouters.post("/", async (request, response) => {
  // Deconstruct body
  const { username, name, password } = request.body;

  const saltRounds = 10;

  console.log(username, name, password);

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouters;
