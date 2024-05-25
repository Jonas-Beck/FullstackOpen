const { test, after, beforeEach, describe } = require("node:test");
const Blog = require("../models/blog");
const User = require("../models/user");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const helper = require("./blog_api_helper");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  // Delete all blogs and users from database
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create a user
  const user = new User(helper.initialUser);
  user.save();

  // Array of all blogs from the initialBlogs array
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  // Create array containing all promises from mapping over the blogObjects array and calling the save method
  const promiseArray = blogObjects.map((blog) => blog.save());

  // Wait for all promises in promiseArray before continuing
  await Promise.all(promiseArray);
});

describe("Blog API CRUD Operations", () => {
  // GET Operations
  describe("GET /api/blogs", () => {
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
  });

  // CREATE Operations
  describe("POST /api/blogs", () => {
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

      // Get all blogs in db and the last blog
      const blogsInDb = await helper.getBlogsInDb();
      const lastBlog = helper.getLastBlog(blogsInDb);

      // Assert new blog has been added
      assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1);

      // Remove id property to assert below
      delete lastBlog.id;
      delete lastBlog.user;

      // Assert last object is the same as blog added
      assert.deepStrictEqual(lastBlog, newBlog);
    });

    test("Validate that likes property defaults to 0", async () => {
      // Blog to add
      const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      };

      // Add blog
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // Get last blog in db
      const lastBlogInDb = await helper.getLastBlogInDb();

      // Assert last blogs likes is the default value
      assert.strictEqual(lastBlogInDb.likes, 0);
    });

    test("Validate that blogs without title return 400 bad request", async () => {
      // Blog to add
      const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      };

      // Add blog and expect a 400 return
      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("Validate that blogs without url return 400 bad request", async () => {
      // Blog to add
      const newBlog = {
        author: "Edsger W. Dijkstra",
        title: "Canonical string reduction",
        likes: 12,
      };

      // Add blog and expect a 400 return
      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });
  // CREATE Operations
  describe("DELETE /api/blogs/:id", () => {
    test("Validate that a blog can be deleted correctly", async () => {
      const blogToDelete = await helper.getLastBlogInDb();

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const lastBlogInDb = await helper.getLastBlogInDb();

      assert.notDeepEqual(blogToDelete, lastBlogInDb);
    });
  });
  // UPDATE Operations
  describe("PUT /api/blogs/:id", () => {
    test("Validate that its possible to update likes of a post", async () => {
      // Get last blog in db and update the likes
      const updatedBlog = await helper.getLastBlogInDb();
      updatedBlog.likes = 100;

      // Update the blog and expect 200 status code
      const result = await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200);

      // Assert that the result is the same as the updatedBlog
      assert.deepEqual(updatedBlog, result.body);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
