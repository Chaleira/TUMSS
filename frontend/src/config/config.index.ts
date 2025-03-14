import { API_URL, PORT, TOKEN } from "@env";

export const API_ENDPOINT = "http://" + API_URL + ":" + PORT;
export const API_MUSIC_STREAM = API_ENDPOINT + "/music/stream/";
export const AUTH_TOKEN = TOKEN;

export const MAIN_SEARCH_URL = "https://www.youtube.com/watch?v=";