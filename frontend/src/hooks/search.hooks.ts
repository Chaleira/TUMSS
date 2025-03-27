import { useState, useEffect, useRef, useCallback } from "react";
import {  searchMusic } from "../api/music.api";
import { TextInput } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';
import { Music } from "types/music.types";


export function useSearch() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Music[]>([]);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus(); // ✅ Focus input with delay
      }, 100); // Small delay to ensure keyboard opens

      return () => clearTimeout(timer); // Cleanup timeout
    }, [])
  );

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await searchMusic(searchQuery);
		console.log("Response", response);
        setResults(response);
      } catch (error: any) {
        console.error("API Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return { inputRef, setSearchQuery, results, loading };
}
