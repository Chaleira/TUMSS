import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.index";

export const authenticateUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token." });
      return;
    }
    // @ts-ignore
    req.user = decoded;
    next();
  });
};
