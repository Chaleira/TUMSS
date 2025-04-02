import React, { StrictMode } from "react";
import { AuthProvider } from "context/auth.context";
import AppNavigator from "navigation/app.navigator";

export default function App() {
	return (
		<StrictMode>
			<AuthProvider>
				<AppNavigator />
			</AuthProvider>
		</StrictMode>
	);
}
