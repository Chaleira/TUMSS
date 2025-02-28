import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SearchBarProps } from "../types/components.types";
import styles from "../styles/SearchBar.styles";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, focus }) => {
  return (
    <View style={styles.container}>
      <TextInput
	  	ref={focus}
        style={styles.input}
        placeholder="Search..."
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchBar;
