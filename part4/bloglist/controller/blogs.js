const blogsRouters = require("express").Router();
const Blog = require("../models/blog");

blogsRouters.get("/", (_request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouters.post("/", (request, response) => {
  console.log("In blog routers post");
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouters;
