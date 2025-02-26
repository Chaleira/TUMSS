import api from "./api";
import { storeToken, removeToken } from "./api";

export const loginUser = async (username: string, password: string) => {
	try {
		const response = await api.post("/user/login", { username, password });
		await storeToken(response.data.token);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
};

export const registerUser = async (username: string, password: string) => {
	try {
		const response = await api.post("/user/register", { username, password });
		await storeToken(response.data.token);
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
};

export const logoutUser = async () => {
	try {
		await removeToken();
	} catch (error: any) {
		throw error;
	}
};

export const getMainData = async () => {
	try {
		const response = await api.get("");
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
};
