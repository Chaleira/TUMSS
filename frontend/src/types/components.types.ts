import { RefObject } from "react";
import { TextInput } from "react-native";

export interface SearchBarProps {
	onSearch: (query: string) => void;
	focus: RefObject<TextInput>;
  }