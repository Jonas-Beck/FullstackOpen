const User = require("../models/user");
const helper = require("./user_api_helper");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany();

    const user = new User(await helper.initialUser());
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "newuser",
      name: "new",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  test("creation succeeds with 3 character username / password", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "123",
      name: "first",
      password: "123",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  test("creation fails with a duplicate username", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "firstuser",
      name: "first",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with a empty username", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "",
      name: "first",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with a empty password", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "test",
      name: "first",
      password: "",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with 2 character username / password", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: "12",
      name: "first",
      password: "12",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.getUsersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
