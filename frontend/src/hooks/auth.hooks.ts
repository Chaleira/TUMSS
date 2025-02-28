import { useAuth } from "../context/auth.context";
import { Alert } from "react-native";

export function useAuthActions() {
	const { onLogin, onLogout } = useAuth();

	const login = (username: string, password: string, navigation: any) =>{
	
		try{
			onLogin(username, password);
			// navigation.replace('Home');
		} catch (error: any) {
			console.log('Login error:', error.message);
			Alert.alert('Login Failed', error.message);
		}
	};

	const logout = (navigation: any | null) => {
		try{
			onLogout();
		} catch (error: any) {
			console.log('Logout error:', error.message);
			alert('Logout Failed');
		}
	};

	return { login, logout, onLogout };
};
