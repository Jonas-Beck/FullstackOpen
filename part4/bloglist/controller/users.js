const bcrypt = require("bcrypt");
const usersRouters = require("express").Router();
const User = require("../models/user");

const validPasswordLength = (password) => {
  return (
    password.length >=
    User.schema
      .path("passwordHash")
      .validators.find((v) => v.type === "minlength").minlength
  );
};

usersRouters.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  response.json(users);
});

usersRouters.post("/", async (request, response) => {
  // Deconstruct body
  const { username, name, password } = request.body;

  if (!validPasswordLength(password)) {
    response.status(400).send({ error: "Invalid password length" });
  }

  const saltRounds = 10;

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
