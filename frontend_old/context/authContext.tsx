import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, AuthContextType } from "../types/authType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN = "authToken";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Store the user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (userData: User) => {
	try {
		await SecureStore.setItemAsync(TOKEN, userData.token);
		await AsyncStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	}
	catch (error: any) {
		console.log('Login error:', error.message);
	}
  };

  const logout = async () => {
	try {
		await SecureStore.deleteItemAsync(TOKEN);
		await AsyncStorage.removeItem("user");
		setUser(null);
	}
	catch (error: any) {
		console.log('Logout error:', error.message);
	}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
