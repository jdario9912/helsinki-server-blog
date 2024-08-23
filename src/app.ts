import express from "express";
import "express-async-errors";
import errorMiddleware from "./middlewares/errors";
import blogRouter from "./routers/blog";
import corsConfig from "./middlewares/cors";
import { connectMongo } from "./db/mongo";

connectMongo();

const app = express();

app.use(corsConfig());

app.use(express.json());

app.disable("x-powered-by");

app.use("/api/blog", blogRouter);

app.use(errorMiddleware);

export default app;
