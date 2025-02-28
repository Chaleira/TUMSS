import api from "./client.api";

export const loginUser = async (username: string, password: string) => {
	try {
		const response = await api.post("/user/login", { username, password });
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
		throw error;
	}
};

export const registerUser = async (username: string, password: string) => {
	try {
		const response = await api.post("/user/register", { username, password });
		return response.data;
	} catch (error: any) {
		if (error.response) throw new Error(error.response.data.message);
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
