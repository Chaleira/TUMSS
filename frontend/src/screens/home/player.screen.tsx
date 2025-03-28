import { View, Text, Alert, Image, ActivityIndicator } from "react-native";
import { useAuth } from "@hooks/auth.hooks";
import MediaButton from "@components/MediaButtons";
import MusicSlider from "@components/MusicSlider";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";
import { useEffect, useState } from "react";

export function PlayerScreen({ navigation, route }: any) {
	const { user } = useAuth();
	const { playTrack, stopTrack, isPlaying, currentTrack, sliderValue, onSliderValueChange, setPlaylistIndex, playlistIndex, duration, load } = useAudioPlayer();
	const [ prevDisabled, setPrevDisabled ] = useState(false);
	const [ nextDisabled, setNextDisabled ] = useState(false);
	// const [ isLoading, setIsLoading] = useState<boolean>(false)

	const handleNext = () => {
		if (playlistIndex < -5) return;
        setPlaylistIndex(playlistIndex + 1);
        setPrevDisabled(true); // Disable "Previous" button
        setTimeout(() => setPrevDisabled(false), 1000); // Re-enable after 1 sec
    };

	const handlePrev = () => {
		if (playlistIndex < -5) return;
		setPlaylistIndex(playlistIndex - 1);
		setNextDisabled(true); // Disable "Next" button
		setTimeout(() => setNextDisabled(false), 1000); // Re-enable after
	}

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>Welcome {user?.username} !</Text>
                <Text style={{ fontSize: 24, paddingBottom: 20 }}>Player Screen</Text>

                {/* Show loading icon if music is being loaded */}
                {load ? (
                    <ActivityIndicator size="large" color="#1DB954" style={{ marginVertical: 20 }} />
                ) : (
                    <>
                        <Image
                            source={{ uri: currentTrack?.thumbnail }}
                            style={{ width: 270, height: 150, borderRadius: 8 }}
                        />
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 24, paddingTop: 20, justifyContent: "center", flexShrink: 1 }}>
                                {currentTrack?.title || "No track loaded"}
                            </Text>
                        </View>
                        <MusicSlider
                            value={sliderValue}
                            onValueChange={onSliderValueChange}
                            maximumValue={duration}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <MediaButton icon="play-back" onPress={handlePrev} disabled={prevDisabled} />
                            <MediaButton icon={isPlaying ? "pause" : "play"} onPress={isPlaying ? stopTrack : playTrack} />
                            <MediaButton icon="play-forward" onPress={handleNext} disabled={nextDisabled} />
                        </View>
                    </>
                )}
            </View>
            <BottomNav navigation={navigation} active="Player" />
        </View>
    );
};

export default PlayerScreen;
