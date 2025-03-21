import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}

export default function MediaButton({ icon, onPress, disabled }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={40} color="grey" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#007bff",
    padding: 12,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});