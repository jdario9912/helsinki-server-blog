import {  NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.message);

  if (error.name === "CastError")
    return res.status(400).send({ error: "id invalido" });
  else if (error.name === "ValidationError")
    return res.status(400).send({ error: error.message });

  next(error);
};

export default errorMiddleware;
