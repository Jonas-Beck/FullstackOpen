// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // If there are no blogs or if blogs array is empty, return 0 likes
  if (!blogs || blogs.length === 0) {
    return 0;
  }

  // Use reduce to sum up the likes of all blogs
  return blogs.reduce((accumulator, current) => {
    return accumulator + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  // Check if blogs is empty or undefined
  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Return blog object with most likes
  return blogs.reduce((mostLikes, current) =>
    // Ternary operator to check which blog to return
    mostLikes.likes >= current.likes ? mostLikes : current,
  );
};

const mostBlogs = (blogs) => {
  // Check if blogs is empty or undefined
  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Create a map to store authors blogs count
  // Using Author name as key and total of blogs as value
  const authorBlogsMap = new Map();

  blogs.forEach((blog) => {
    // Loop all blogs and add new element to the map with value of 1 or increment the value of the existing element
    authorBlogsMap.set(blog.author, (authorBlogsMap.get(blog.author) || 0) + 1);
  });

  // Use reduce on 2D array of authorBlogsMap containing key and value.
  const reduceResult = [...authorBlogsMap.entries()].reduce(
    (a, e) => (a[1] >= e[1] ? a : e),
    // Returns array with highest value
  );

  // Return corretly formated object
  return {
    author: reduceResult[0],
    blogs: reduceResult[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
