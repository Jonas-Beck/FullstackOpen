// Import Utils
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");
// Import app
const app = require("./app");

// Start app on .env PORT number
app.listen(PORT, () => logger.info(`Server Running on port ${PORT}`));
