import { getDownloadedSong } from "./downloadService";
import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;
let statusCallback: ((status: any) => void) | null = null;
let isPlaying: boolean = false;

export async function playSong(url: string, song?: any) {
  try {
    console.log(' Playing song:', song?.name || 'Unknown');
    console.log(' Audio URL:', url);
    
    // Force stop and unload any existing sound
    if (sound) {
      console.log(' Stopping previous sound...');
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (error) {
        console.log('Error stopping previous sound:', error);
      }
      sound = null;
      isPlaying = false;
    }

    // Set audio mode to ensure proper playback
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
    });

    let sourceUri = url;

    if (song?.id) {
      const downloaded = await getDownloadedSong(song.id);
      if (downloaded?.localUri) {
        sourceUri = downloaded.localUri;
        console.log(' Using downloaded file:', sourceUri);
      }
    }

    console.log(' Creating sound with URI:', sourceUri);
    
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: sourceUri },
      { 
        shouldPlay: true,
        volume: 1.0,
        isLooping: false
      },
      (status) => {
        if (status.isLoaded) {
          console.log('📊 Audio status:', {
            isLoaded: status.isLoaded,
            isPlaying: status.isPlaying,
            positionMillis: status.positionMillis,
            durationMillis: status.durationMillis,
            didJustFinish: status.didJustFinish,
            volume: status.volume
          });
          
          // Update playing state
          isPlaying = status.isPlaying;
          
          if (status.didJustFinish) {
            console.log('✅ Song finished');
            isPlaying = false;
          }
        }
        
        if (statusCallback) {
          statusCallback(status);
        }
      }
    );

    sound = newSound;
    isPlaying = true;
    console.log('✅ Sound created and playing successfully');
    
    if (statusCallback) {
      sound.setOnPlaybackStatusUpdate(statusCallback);
    }
    
  } catch (error) {
    console.error(' Error playing song:', error);
    isPlaying = false;
    throw error;
  }
}

export async function pauseSong() {
  if (!sound) {
    console.log('No sound to pause');
    return;
  }
  
  try {
    console.log(' Pausing sound...');
    await sound.pauseAsync();
    isPlaying = false;
    console.log( 'Sound paused');
  } catch (error) {
    console.error('Error pausing sound:', error);
  }
}

export async function resumeSong() {
  if (!sound) {
    console.log(' No sound to resume');
    return;
  }
  
  try {
    console.log('▶️ Resuming sound...');
    await sound.playAsync();
    isPlaying = true;
    console.log('✅ Sound resumed');
  } catch (error) {
    console.error('❌ Error resuming sound:', error);
  }
}

export async function stopSong() {
  if (!sound) {
    console.log('⏹️ No sound to stop');
    return;
  }
  
  try {
    console.log('⏹️ Stopping sound...');
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
    isPlaying = false;
    console.log('✅ Sound stopped and unloaded');
  } catch (error) {
    console.error('❌ Error stopping sound:', error);
  }
}

export function setOnPlaybackStatusUpdate(
  callback: (status: any) => void
) {
  statusCallback = callback;

  if (sound) {
    sound.setOnPlaybackStatusUpdate(callback);
  }
}

export async function seekTo(positionMillis: number) {
  if (!sound) {
    console.log('⏩ No sound to seek');
    return;
  }
  
  try {
    console.log('⏩ Seeking to:', positionMillis);
    await sound.setPositionAsync(positionMillis);
    console.log('Seek completed');
  } catch (error) {
    console.error('❌ Error seeking:', error);
  }
}

export function getIsPlaying(): boolean {
  return isPlaying;
}

export function getCurrentSound(): Audio.Sound | null {
  return sound;
}

export async function cleanupAudio() {
  console.log(' Cleaning up audio...');
  await stopSong();
  statusCallback = null;
}
