import { Response, NextFunction, RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/request.types";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.index";

export const authenticateUser: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

		req.user = decoded;
		next();
	});
};
