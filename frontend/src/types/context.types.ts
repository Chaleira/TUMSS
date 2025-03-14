export interface User {
	id: string;
	username: string;
}

export interface AuthContextType {
	user: User | null;
	login: (usrname: string, password: string) => void;
	logout: () => void;
	loading: boolean;
	register: (username: string, password: string) => Promise<boolean>;
  }

