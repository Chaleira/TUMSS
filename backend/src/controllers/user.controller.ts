import { Request, Response } from "express";
import { userService } from "../services/user.service";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.index";

export const userController = {

	registerUser: async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ error: "Username and password are required" });
		return;
	}

	try {
		const existingUser = await userService.findUserByUsername(username);
		if (existingUser) {
			res.status(400).json({ error: "Username already exists" });
			return;
		}

		const userId = await userService.createUser(username, password);
		res.status(201).json({ message: "User created", userId });
	} catch (error: any) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
	},

	loginUser: async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ error: "Username and password are required" });
		return;
	}

	const user = await userService.validateUser(username, password);
	if (!user) {
		res.status(401).json({ error: "Invalid credentials" });
		return;
	}

	const token = jwt.sign({ id: user?.id }, jwt_secret, { expiresIn: "1h" });

	res.status(200).json({ token });
	},
}