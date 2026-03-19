import * as FileSystem from "expo-file-system/legacy";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DOWNLOAD_DIR = `${FileSystem.cacheDirectory}music/`;

export async function downloadSong(song: any, audioUrl: string) {
  await FileSystem.makeDirectoryAsync(DOWNLOAD_DIR, {
    intermediates: true,
  });

  const fileUri = `${DOWNLOAD_DIR}${song.id}.mp3`;

  const { uri } = await FileSystem.downloadAsync(audioUrl, fileUri);

  const stored = await AsyncStorage.getItem("DOWNLOADED_SONGS");
  const parsed = stored ? JSON.parse(stored) : {};

  parsed[song.id] = {
    id: song.id,
    localUri: uri,
    name: song.name,
    artist: song.primaryArtists,
  };

  await AsyncStorage.setItem(
    "DOWNLOADED_SONGS",
    JSON.stringify(parsed)
  );

  return uri;
}

export async function getDownloadedSong(songId: string) {
  const stored = await AsyncStorage.getItem("DOWNLOADED_SONGS");
  if (!stored) return null;

  const parsed = JSON.parse(stored);
  return parsed[songId] || null;
}