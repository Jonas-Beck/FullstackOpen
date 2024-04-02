const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
};
