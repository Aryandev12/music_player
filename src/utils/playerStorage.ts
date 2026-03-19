import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "PLAYER_QUEUE_STATE";

export async function savePlayerState(queue: any[], currentIndex: number) {
  try {
    const data = JSON.stringify({ queue, currentIndex });
    await AsyncStorage.setItem(QUEUE_KEY, data);
  } catch (e) {
    console.log("Failed to save player state", e);
  }
}

export async function loadPlayerState() {
  try {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.log("Failed to load player state", e);
    return null;
  }
}