import React from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StatusBar } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useSearch } from "../../hooks/music.hooks";

export function SearchScreen(){
  const { inputRef, setSearchQuery, results, loading } = useSearch();

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 40 }}>
      <SearchBar onSearch={setSearchQuery} focus={inputRef}/>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.videoUrl}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log("Video URL:", item.videoUrl)}>
            <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 70, borderRadius: 8, marginRight: 10 }} />
              <Text style={{ fontSize: 16, flexShrink: 1 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
