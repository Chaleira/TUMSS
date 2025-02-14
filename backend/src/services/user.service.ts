import db from "../database";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const createUser = async (username: string, password: string): Promise<number | bigint> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  const result = stmt.run(username, hashedPassword);
  return result.lastInsertRowid;
};

export const findUserByUsername = (username: string): User | undefined => {
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  return stmt.get(username) as User | undefined;
};

export const validateUser = async (username: string, password: string): Promise<boolean | User> => {
  const user = findUserByUsername(username);
  if (!user) return false;
  if (await bcrypt.compare(password, user.password)) {
    return user;
  }
  return false;
};
