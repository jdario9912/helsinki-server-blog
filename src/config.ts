import dotevn from "dotenv";

dotevn.config();

const env = process.env;

const PORT = env.PORT || 3000;
const MONGO_URI =
  env.NODE_ENV === "test" ? env.MONGO_TEST_CONN_STR : env.MONGO_URI;

export default {
  PORT,
  MONGO_URI,
};
