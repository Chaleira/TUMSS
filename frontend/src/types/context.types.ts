export interface User {
	id: string;
	username: string;
}

export interface AuthContextType {
	user: User | null;
	onLogin: (usrname: string, password: string) => void;
	onLogout: () => void;
	isAuthenticated: boolean;
  }