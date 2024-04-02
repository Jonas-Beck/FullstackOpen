const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

// Create test data
const bigList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const listWithTwoFavorites = [
  {
    title: "Building a second braind",
    author: "Tiago Forte",
    url: "localhost:3001",
    likes: 5,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  },
  {
    title: "TDD harms architecture",
    author: "Robert Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
];

const listWithOneBlog = [
  {
    title: "Building a second braind",
    author: "Tiago Forte",
    url: "localhost:3001",
    likes: 5,
  },
];

const emptyList = [];

test("Dummy returns one", () => {
  const result = listHelper.dummy(emptyList);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });

  test("when no list is provided is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(bigList);
    assert.strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("should return null if list is empty", () => {
    const result = listHelper.favoriteBlog(emptyList);
    assert.strictEqual(result, null);
  });

  test("should return null when no list is provided", () => {
    const result = listHelper.favoriteBlog();
    assert.strictEqual(result, null);
  });

  test("when list has only one blog it should return that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("when list have multiple blogs should return the one with most likes", () => {
    const result = listHelper.favoriteBlog(bigList);
    assert.deepStrictEqual(result, bigList[2]);
  });

  test("when list have two blogs with most likes should return the first one", () => {
    const result = listHelper.favoriteBlog(listWithTwoFavorites);
    assert.deepStrictEqual(result, listWithTwoFavorites[0]);
  });
});

describe("most blogs", () => {
  test("should return null if list is empty", () => {
    const result = listHelper.mostBlogs(emptyList);
    assert.strictEqual(result, null);
  });

  test("should return null when no list is provided", () => {
    const result = listHelper.mostBlogs();
    assert.strictEqual(result, null);
  });

  test("when list has only one blog it should return that auther with 1 blog", () => {
    const expectedResult = {
      author: "Tiago Forte",
      blogs: 1,
    };

    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, expectedResult);
  });

  test("when list has multiple blogs should return author with most blogs", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    const result = listHelper.mostBlogs(bigList);
    assert.deepStrictEqual(result, expectedResult);
  });

  test("when list have two author with same amount of blogs should return first author", () => {
    const expectedResult = {
      author: "Tiago Forte",
      blogs: 1,
    };

    const result = listHelper.mostBlogs(listWithTwoFavorites);
    assert.deepStrictEqual(result, expectedResult);
  });
});
