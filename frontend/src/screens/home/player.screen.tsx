import { View, Text, Alert, Image } from "react-native";
import { useAuth } from "@hooks/auth.hooks";
import MediaButton from "@components/MediaButtons";
import MusicSlider from "@components/MusicSlider";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";

export function PlayerScreen({ navigation, route }: any) {
	const { user } = useAuth();
	const { playTrack, stopTrack, isPlaying, currentTrack, sliderValue, setSliderValue } = useAudioPlayer();

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 24 }}>Welcome {user?.username} !</Text>
				<Text style={{ fontSize: 24, paddingBottom: 20 }}>Player Screen</Text>
				<Image source={{ uri: currentTrack?.thumbnail }} style={{ width: 270, height: 150, borderRadius: 8}} />
				<MusicSlider value={sliderValue} onValueChange={setSliderValue} />
				<View style={{ justifyContent: "center"}}>
					<Text style={{ fontSize: 24, paddingTop: 20, justifyContent: "center" }}>{currentTrack?.title || "No track loaded"}</Text>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
					<MediaButton icon="play-back" onPress={() => alert("Previous Song")} />
					<MediaButton icon={isPlaying ? "pause" : "play"} onPress={isPlaying ? stopTrack : playTrack} />
					<MediaButton icon="play-forward" onPress={() => alert("Next Song")} />
					</View>
				{/* </View>
			<View style={{flex:1, justifyContent:"flex-end", alignItems:"center"}}> */}
			</View>
			<BottomNav navigation={navigation} active="Player" />
		</View>
	);
}
