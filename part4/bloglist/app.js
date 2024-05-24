const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouters = require("./controller/blogs");
const usersRouters = require("./controller/users");
const { errorHandler } = require("./utils/errorHandler");

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouters);
app.use("/api/users", usersRouters);

app.use(errorHandler);

module.exports = app;
