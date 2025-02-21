import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
	user?: string | JwtPayload; // Adjust based on your JWT payload structure
}
