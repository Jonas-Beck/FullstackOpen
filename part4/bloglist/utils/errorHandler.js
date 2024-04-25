const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: "Validation Error" });
  }

  next(error);
};

module.exports = {
  errorHandler,
};
