import mongoose from "mongoose";
import config from "../config";
import logger from "../libs/loggers";

export const connectMongo = () => {
  mongoose
    .connect(config.MONGO_URI!)
    .then(() => logger.info("MongoDB connected"))
    .catch((error: unknown) => {
      if (error instanceof Error) logger.error(error.message);
      console.log(error);
    });
};

export const closeConnMongo = () => {
  mongoose.connection.close();
};
