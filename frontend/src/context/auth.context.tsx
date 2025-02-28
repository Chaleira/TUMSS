import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser } from '../api/user.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AuthContextType, User } from '../types/context.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any ) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogin = async (username: string, password: string) => {
	try {
		const userData = await loginUser(username, password);
		const user: User = {id: userData.user.id, username: userData.user.username};
		await SecureStore.setItemAsync('authToken', userData.token);
		await AsyncStorage.setItem('user', JSON.stringify(user));
		setUser(user);
		setIsAuthenticated(true);
		return user;
	} catch (error: any) {
		console.log('onLogin error:', error.message);
		throw new Error(error.message);
	}
  };

  const onLogout = async () => {
	try {
		await SecureStore.deleteItemAsync('authToken');
		await AsyncStorage.removeItem('user');
		setUser(null);
		setIsAuthenticated(false);
		return;
	} catch (error: any) {
		console.log('Logout error:', error.message);
		throw new Error(error.message);
	}
  };

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
