const { test, after, beforeEach } = require("node:test");
const Blog = require("../models/blog");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const helper = require("./blog_api_helper");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  // Delete all blogs from database
  await Blog.deleteMany({});

  // Array of all blogs from the initialBlogs array
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  // Create array containing all promises from mapping over the blogObjects array and calling the save method
  const promiseArray = blogObjects.map((blog) => blog.save());

  // Wait for all promises in promiseArray before continuing
  await Promise.all(promiseArray);
});

test("Returns correct amount of blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("Correct name id property", async () => {
  const response = await api.get("/api/blogs");

  // Validate that id property exist in the objects
  assert.strictEqual("id" in response.body[0], true);
  // Validate that the mongodb _id property dosen't exist
  assert.strictEqual("_id" in response.body[0], false);
});

test("Creates a new blog succesfully", async () => {
  // Blog to add
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  // Add blog
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Retrieve all blogs
  const response = await api.get("/api/blogs");
  const content = response.body;

  // Assert new blog has been added
  assert.strictEqual(content.length, helper.initialBlogs.length + 1);

  // Remove id property to assert below
  delete content[content.length - 1].id;

  // Assert last object is the same as blog added
  assert.deepStrictEqual(content[content.length - 1], newBlog);
});

after(async () => {
  await mongoose.connection.close();
});
