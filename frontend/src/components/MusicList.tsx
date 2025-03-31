import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Music } from "types/music.types";
import { Ionicons } from "@expo/vector-icons";
import { add } from "lodash";
import { PlaylistType } from "types/components.types";
export interface MusicListProps {
  playlist: Music[];
  onPressMusic: (item: Music) => void;
  onPressAdd?: (item: Music) => void;
  addVisible?: boolean;
  removeVisible?: boolean;
  onPressRemove?: (item: Music) => void;
}

const MusicList: React.FC<MusicListProps> = ({ playlist, onPressMusic, onPressAdd, addVisible, removeVisible, onPressRemove }) => {

	addVisible = addVisible === undefined ? true : false;
  return (
	<View>
    <FlatList
      data={playlist}
      keyExtractor={(item) => item.fileId}
      contentContainerStyle={{ paddingBottom: 45 }}
      renderItem={({ item }) => (
		// console.log("Thumbnail", item.thumbnail),
        <TouchableOpacity
          onPress={() => onPressMusic(item)}
        >
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
				<Text style={styles.title}>{item.title}</Text>
			</View>
			{addVisible && !removeVisible && (
				<TouchableOpacity style={styles.addButton} onPress={() => onPressAdd && onPressAdd(item)}>
					<Ionicons name="add" size={24} color="white" />
				</TouchableOpacity>
			)}
			{ removeVisible && !addVisible && (
				<TouchableOpacity style={styles.removeButton} onPress={() => onPressRemove && onPressRemove(item)}>
					<Ionicons name="remove" size={24} color="white" />
				</TouchableOpacity>
			)}
          </View>
        </TouchableOpacity>
      )}
    />
	</View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 5,
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
  textContainer: {
    flex: 1, // Allows it to shrink and not take up unnecessary space
    marginRight: 50, // Creates space before the "+" button
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 9,
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  removeButton: {
    position: "absolute",
    bottom: 30,
    right: 9,
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MusicList;