const blogsRouters = require("express").Router();
const Blog = require("../models/blog");

blogsRouters.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouters.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();

  response.status(201).json(result);
});

blogsRouters.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouters.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(200).json(updatedBlog);
});

module.exports = blogsRouters;
