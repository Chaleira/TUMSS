import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../hooks/search.hooks";
import BottomNav from "@components/BottomNav";
import { useAudioPlayer } from "@hooks/player.hooks";

export function SearchScreen({ navigation }: any) {
  const { inputRef, setSearchQuery, results, loading } = useSearch();
  const { selectTrack } = useAudioPlayer();

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 40 }}>
      <SearchBar onSearch={setSearchQuery} focus={inputRef}/>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.videoUrl}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { selectTrack({fileId: item.videoUrl, title: item.title, thumbnail: item.thumbnail}); navigation.navigate("Player");}}>
            <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 70, borderRadius: 8, marginRight: 10 }} />
              <Text style={{ fontSize: 16, flexShrink: 1 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
	<BottomNav navigation={navigation} active="Search" />
    </View>
  );
};
