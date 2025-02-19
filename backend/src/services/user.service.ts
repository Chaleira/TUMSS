import bcrypt from "bcrypt";
import User from "../models/user.model";

export const userService = {
  createUser: async (
    username: string,
    password: string
  ): Promise<User | null> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: User = await User.create({
        username,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      console.error("Error creating User: ", error);
      return null;
    }
  },

  findUserByUsername: async (username: string): Promise<User | null> => {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("Error finding User: ", error);
      return null;
    }
  },

  validateUser: async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const user = await userService.findUserByUsername(username);
    if (!user) return null;
    if (await bcrypt.compare(password, user.password)) return user;
    return null;
  },
};
