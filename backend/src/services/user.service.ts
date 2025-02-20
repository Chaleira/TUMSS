import bcrypt from "bcrypt";
import User from "../models/user.model";

export const userService = (() => {

	// This is a private method
	// const privateMethod = () => {
	// 	// Do something
	// };

	// After this return statement, all methods are public
	return {
        createUser: async (username: string, password: string): Promise<User | null> => {
            try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: User = await User.create({
                username,
                password: hashedPassword,
            });
            return user;
            } catch (error: any) {
				console.error(error.message);
				throw new Error("Error creating user");
            }
        },

        findUserByUsername: async (username: string): Promise<User | null> => {
            try {
            const user = await User.findOne({
                where: {
                username,
                },
            });
            return user;
            } catch (error: any) {
				console.error(error.message);
				throw new Error("Error finding user");
            }
        },

        validateUser: async (username: string, password: string): Promise<User | null> => {
			try {
				const user = await userService.findUserByUsername(username);
				if (!user) return null;
				if (await bcrypt.compare(password, user.password)) return user;
				return null;
			} catch (error: any) {
				console.error(error.message);
				throw new Error("Error validating user");
			}
        },
	};
})();
