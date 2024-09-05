import { NextFunction, Request, Response } from "express";

const allowedOrigins = ["http://localhost:4200"];

const applyMiddleware = (app: any) =>
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", ...allowedOrigins);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, POST, PUT, DELETE, OPTIONS"
    );
    next();
  });

export default applyMiddleware;
