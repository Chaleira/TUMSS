const API_URL = process.env.API_URL;
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const NEW_TOKEN = process.env.NEW_TOKEN;

export const API_ENDPOINT = "http://" + API_URL + ":" + PORT;
export const API_MUSIC_STREAM = API_ENDPOINT + "/music/stream/";
export const AUTH_TOKEN = TOKEN;
export const REFRESH_TOKEN = NEW_TOKEN

export const MAIN_SEARCH_URL = "https://www.youtube.com/watch?v=";