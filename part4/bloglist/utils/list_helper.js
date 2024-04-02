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

  // Create map using aggregateMapFromList containing all authors as keys with total count of blogs as value
  const authorBlogsMap = aggregateMapFromList(
    blogs, // List to craate map from
    (blog) => blog.author, // Function that return property to use as key
    () => 1, // Function that return increment amount
  );

  // Get array containing Key and Value of the highest Value
  const reduceResult = getHighestMapValueWithKey(authorBlogsMap);

  // Return corretly formated object
  return {
    author: reduceResult[0],
    blogs: reduceResult[1],
  };
};

const mostLikes = (blogs) => {
  // Check if blogs is empty or undefined
  if (!blogs || blogs.length === 0) {
    return null;
  }

  // Create map using aggregateMapFromList containing all authors as keys with total count of blogs as value
  const authorLikesMap = aggregateMapFromList(
    blogs, // List to create map from
    (blog) => blog.author, // Function that return property to use as key
    (blog) => blog.likes, // Function that return increment amount
  );

  // Get array containing Key and Value of the highest Value
  const reduceResult = getHighestMapValueWithKey(authorLikesMap);

  return {
    author: reduceResult[0],
    likes: reduceResult[1],
  };
};

/**
 * Takes a map with number values and returns an array containing the key and value of the highest value.
 *
 * @param {Map} map - The map with number values.
 * @returns {Array} An array containing the key and value of the highest value in the map.
 */
const getHighestMapValueWithKey = (map) => {
  // Use reduce on 2D array of provided map containing key and value.
  return [...map.entries()].reduce(
    (a, e) => (a[1] >= e[1] ? a : e),
    // Returns array with highest value
  );
};

/**
 * Creates an aggregate map from a list of entries.
 * @param {Array} list - The list of entries to aggregate.
 * @param {Function} keyFunction - A function that returns the key for each entry.
 * @param {Function} valueIncrementFunction - A function that determines how the value should be incremented for each entry.
 * @returns {Map} The aggregate map.
 */
const aggregateMapFromList = (list, keyFunction, valueIncrementFunction) => {
  // Create map to return
  const map = new Map();

  // Loop all entries in the list
  list.forEach((entry) => {
    // Get the key value using provided function
    const key = keyFunction(entry);
    // Get the incrementValue using provided function
    const incrementValue = valueIncrementFunction(entry);
    // Loop all entries and add new element to the map with value == incrementValue or increment the value of the existing element using incrementValue
    map.set(key, (map.get(key) || 0) + incrementValue);
  });

  return map;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
