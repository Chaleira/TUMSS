import { RefObject } from "react";
import { TextInput } from "react-native";
import { Music } from "./music.types";

export interface SearchBarProps {
	onSearch: (query: string) => void;
	focus: RefObject<TextInput>;
  }

export interface PlaylistType {
	id: string;
	name: string;
	music: Music[];
  }