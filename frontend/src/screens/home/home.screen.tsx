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

export default function HomeScreen({ navigation }: any) {
	const { user, logout } = useAuth();
	const { songs } = useHome();
	const { selectTrack } = useAudioPlayer();

	const handleGet = async () => {
		try {
			const data = await getMainData();
			Alert.alert("Get", data);
		} catch (error: any) {
			Alert.alert("Get", error.message);
		}
	};

	return (
		<View style={{ flex: 1, paddingLeft: 10 }}>
			<View style={{ flexDirection: "row", paddingTop: 35, alignItems: "flex-end" }}>
				<Text style={{ fontSize: 24 }}>Lastly Played</Text>
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
				{/* <Text style={{ fontSize: 24 }}>Lastly Played</Text> */}
			</View>
				<FlatList
					data={songs}
					keyExtractor={(item) => item.fileId}
					contentContainerStyle={{ paddingBottom: 45 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={async () => {
								await selectTrack(item, navigation);
							}}
						>
							<View style={{ flexDirection: "row", padding: 10, alignItems: "center", paddingLeft: 0 }}>
								<Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 70, borderRadius: 8, marginRight: 10 }} />
								<Text style={{ fontSize: 16, flexShrink: 1 }}>{item.title}</Text>
							</View>
						</TouchableOpacity>
					)}
				></FlatList>
			<BottomNav navigation={navigation} active="Home" />
		</View>
	);
}
