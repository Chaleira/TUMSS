import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../hooks/search.hooks";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";
import MusicList from "@components/MusicList";
import { createMusic } from "@api/music.api";
import { Music } from "types/music.types";

export function SearchScreen({ navigation }: any) {
  const { inputRef, setSearchQuery, results, loading } = useSearch();
  const { selectTrack } = useAudioPlayer();

  const handleOnPress = async (item: Music) => {
	try {
		// const response = await createMusic(item.fileId);
		selectTrack(item);
		navigation.navigate("Player");
		// console.log("Response", response);
	}
	catch (error: any) {
		console.log("API Error:", error.message);
	}
	};

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 40 }}>
      <SearchBar onSearch={setSearchQuery} focus={inputRef}/>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

	  <MusicList playlist={results} onPress={handleOnPress}/>
	<BottomNav navigation={navigation} active="Search" />
    </View>
  );
};
