const Blogs = require("../models/blog");

const initialBlogs = [
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
];

const initialUser = {
  username: "firstname",
  name: "name",
  passwordHash: "secretpassword",
};

const getLastBlog = (blogs) => blogs[blogs.length - 1];

const getLastBlogInDb = async () => {
  const blogs = await Blogs.find({});
  const blogsJson = blogs.map((blog) => blog.toJSON());
  return getLastBlog(blogsJson);
};

const getBlogsInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  getLastBlog,
  getBlogsInDb,
  getLastBlogInDb,
  initialUser,
};
