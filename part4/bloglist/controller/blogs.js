const blogsRouters = require("express").Router();
const Blog = require("../models/blog");

blogsRouters.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouters.post("/", (request, response) => {
  console.log("In blog routers post");
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouters;
