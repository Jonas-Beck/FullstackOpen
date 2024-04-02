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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
