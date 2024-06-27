import { Request, Response, NextFunction } from "express";
import HttpException from "../util/http-exception";

const ErrorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Unidentified error";
  res.status(errorStatus).json({
    message: errorMessage,
    stack: err.stack,
  });
};

export default ErrorHandler;
