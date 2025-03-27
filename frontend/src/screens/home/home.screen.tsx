import React from "react";
import { View, Text, Alert, TouchableOpacity, Image } from "react-native";
import MyButton from "components/MyButton";
import BottomNav from "components/BottomNav";
import { getMainData } from "@api/user.api";
import { useAuth } from "@hooks/auth.hooks";
import { useHome } from "@hooks/home.hooks";
import { FlatList } from "react-native-gesture-handler";
import { useAudioPlayer } from "@hooks/player.hooks";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MusicList from "@components/MusicList";

export default function HomeScreen({ navigation }: any) {
	const { logout } = useAuth();
	const { homePlaylist } = useHome();
	const { setPlaylistIndex } = useAudioPlayer();

	const handleGet = async () => {
		try {
			await SecureStore.deleteItemAsync('authToken');
			await AsyncStorage.removeItem('user');
			const data = await getMainData();
			Alert.alert("Get", data);
		} catch (error: any) {
			Alert.alert("Get", error.message);
		}
	};

	return (
		<View style={{ flex: 1, paddingLeft: 10 }}>
			<View style={{ flexDirection: "row", paddingTop: 35, alignItems: "flex-end" }}>
				<Text style={{ fontSize: 24 }}>Community Music</Text>
				<TouchableOpacity
					onPress={handleGet}
					style={{ marginLeft: "auto", paddingRight: 10 }}
				>
					<Ionicons name="help" size={28} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => logout()}
					style={{ paddingRight: 10 }}
				>
					<Ionicons name="log-out" size={28} />
				</TouchableOpacity>
			</View>
				<MusicList playlist={homePlaylist} onPressMusic={async (item) => {
							setPlaylistIndex(homePlaylist.indexOf(item));
							navigation.navigate("Player");
				}}/>
			<BottomNav navigation={navigation} active="Home" />
		</View>
	);
}
