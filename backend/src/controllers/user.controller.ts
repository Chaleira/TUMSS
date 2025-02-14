import { Request, RequestHandler, Response } from "express";
import {
  createUser,
  findUserByUsername,
  validateUser,
} from "../services/user.service";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.index";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const existingUser = findUserByUsername(username);
  if (existingUser) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }

  const userId = await createUser(username, password);
  res.status(201).json({ message: "User created", userId });
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const user = await validateUser(username, password);
  if (user === false || user === true) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user?.id }, jwt_secret, { expiresIn: "1h" });

  res.json({ token, message: "Login successful" });
};

// This is basicly ussless
export const logoutUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  // @ts-ignore
  req.user = null;
  res.json({ message: "Logout successful" });
};
