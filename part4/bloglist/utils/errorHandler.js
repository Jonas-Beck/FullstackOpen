const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: "Validation Error" });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .send({ error: "expected 'username' to be unique" });
  }

  next(error);
};

module.exports = {
  errorHandler,
};
