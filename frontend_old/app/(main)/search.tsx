import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useMusicActions } from "hooks/musicHooks";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<{ title: string; thumbnail: string; videoUrl: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { search } = useMusicActions();

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await search(searchQuery);
        setResults(response); // Assuming API response is an array of objects
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SearchBar onSearch={setSearchQuery} />

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

export default SearchScreen;
