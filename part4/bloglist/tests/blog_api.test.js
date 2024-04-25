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

after(async () => {
  await mongoose.connection.close();
});
