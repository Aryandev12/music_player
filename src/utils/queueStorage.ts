import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '../types/song';

const QUEUE_STORAGE_KEY = 'music_player_queue';
const CURRENT_INDEX_KEY = 'music_player_current_index';
const REPEAT_MODE_KEY = 'music_player_repeat_mode';
const SHUFFLE_KEY = 'music_player_shuffle';

export interface QueueStorage {
  queue: Song[];
  currentIndex: number;
  repeatMode: 'off' | 'all' | 'one';
  shuffle: boolean;
}

export async function saveQueueToStorage(
  queue: Song[],
  currentIndex: number,
  repeatMode: 'off' | 'all' | 'one',
  shuffle: boolean
) {
  try {
    await AsyncStorage.multiSet([
      [QUEUE_STORAGE_KEY, JSON.stringify(queue)],
      [CURRENT_INDEX_KEY, currentIndex.toString()],
      [REPEAT_MODE_KEY, repeatMode],
      [SHUFFLE_KEY, shuffle.toString()]
    ]);
    console.log('Queue saved to storage');
  } catch (error) {
    console.error('Error saving queue to storage:', error);
  }
}

export async function loadQueueFromStorage(): Promise<QueueStorage | null> {
  try {
    const [queueData, currentIndexData, repeatModeData, shuffleData] = await AsyncStorage.multiGet([
      QUEUE_STORAGE_KEY,
      CURRENT_INDEX_KEY,
      REPEAT_MODE_KEY,
      SHUFFLE_KEY
    ]);

    const queue = queueData[1] ? JSON.parse(queueData[1]) : [];
    const currentIndex = currentIndexData[1] ? parseInt(currentIndexData[1], 10) : -1;
    const repeatMode = (repeatModeData[1] as 'off' | 'all' | 'one') || 'off';
    const shuffle = shuffleData[1] === 'true';

    console.log('Queue loaded from storage:', queue.length, 'songs');
    
    return {
      queue,
      currentIndex,
      repeatMode,
      shuffle
    };
  } catch (error) {
    console.error('Error loading queue from storage:', error);
    return null;
  }
}

export async function clearQueueFromStorage() {
  try {
    await AsyncStorage.multiRemove([
      QUEUE_STORAGE_KEY,
      CURRENT_INDEX_KEY,
      REPEAT_MODE_KEY,
      SHUFFLE_KEY
    ]);
    console.log('Queue cleared from storage');
  } catch (error) {
    console.error('Error clearing queue from storage:', error);
  }
}
