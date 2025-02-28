import { useAuth } from "../context/authContext";
import { AuthProvider } from "../context/authContext";
import { useRouter} from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

const ProtectedRoutes = () => {
	const { user, loading } = useAuth();

  
	useEffect(() => {
	  if (!loading) {
		if (!user) router.replace("/login");
		else router.replace("/(main)");
	  }
	}, [user, loading]);
  
	if (loading) {
	  return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		  <ActivityIndicator size="large" />
		</View>
	  );
	}
  };

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoutes />
    </AuthProvider>
  );
}
