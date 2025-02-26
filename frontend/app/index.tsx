import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        router.replace('/(main)'); // Redirect to main app if logged in
      } else {
        router.replace('/login'); // Stay on login page
		// router.replace('/(main)');
	}
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) return <View><Text>Loading...</Text></View>; // Show loading while checking auth

  return null;
}
