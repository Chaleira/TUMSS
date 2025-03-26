import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface PlaylistItem {
  fileId: string;
  title: string;
  thumbnail: string;
}

interface MusicListProps {
  playlist: PlaylistItem[];
//   setPlaylistIndex: (index: number) => void;
//   navigation: any;
  onPress?: (item: PlaylistItem) => void;
}

const MusicList: React.FC<MusicListProps> = ({ playlist, onPress }) => {

  return (
    <FlatList
      data={playlist}
      keyExtractor={(item) => item.fileId}
      contentContainerStyle={{ paddingBottom: 45 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress && onPress(item)}
        >
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    paddingLeft: 0,
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
});

export default MusicList;