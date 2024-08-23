import app from "./app";
import config from "./config";
import logger from "./libs/loggers";

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${config.PORT}`)
);
