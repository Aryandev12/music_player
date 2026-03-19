import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Audio } from "expo-av";

import RootNavigator from "./src/navigation/RootNavigator";
import MiniPlayer from "./src/components/MiniPlayer";
import { usePlayerStore } from "./src/store/playerStore";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  const loadQueueFromStorage = usePlayerStore(
    (state) => state.loadQueueFromStorage
  );

  useEffect(() => {
    // Configure audio for background playback
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Load queue from AsyncStorage
    loadQueueFromStorage();
  }, [loadQueueFromStorage]);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
        <MiniPlayer />
      </NavigationContainer>
    </ThemeProvider>
  );
}