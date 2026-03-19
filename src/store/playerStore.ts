import { create } from "zustand";
import { savePlayerState } from "../utils/playerStorage";
import { saveQueueToStorage, loadQueueFromStorage } from "../utils/queueStorage";
import { Song, PlayerState } from "../types/song";

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  currentSong: null,
  isPlaying: false,

  shuffle: false,
  repeatMode: "off",

  playSongNow: (song) => {
    set({
      queue: [song],
      currentIndex: 0,
      currentSong: song,
      isPlaying: true,
    });
    savePlayerState([song], 0);
  },

  setQueueFromListAndPlay: (songs, index) => {
    if (!songs || songs.length === 0) return;

    const safeIndex = index >= 0 && index < songs.length ? index : 0;

    set({
      queue: songs,
      currentIndex: safeIndex,
      currentSong: songs[safeIndex],
      isPlaying: true,
    });
    savePlayerState(songs, safeIndex);
  },

  addToQueue: (song) => {
    set((state) => {
      const updatedQueue = [...state.queue, song];
      savePlayerState(updatedQueue, state.currentIndex);
      return { queue: updatedQueue };
    });
  },

  removeFromQueue: (index) => {
    const { queue, currentIndex } = get();
    if (index < 0 || index >= queue.length) return;

    const updatedQueue = queue.filter((_, i) => i !== index);

    let newIndex = currentIndex;

    if (index < currentIndex) {
      newIndex = currentIndex - 1;
    } else if (index === currentIndex) {
      newIndex = Math.min(currentIndex, updatedQueue.length - 1);
    }

    set({
      queue: updatedQueue,
      currentIndex: updatedQueue.length ? newIndex : -1,
      currentSong: updatedQueue[newIndex] ?? null,
      isPlaying: updatedQueue.length > 0,
    });

    savePlayerState(updatedQueue, newIndex);
    
    // Save to AsyncStorage
    const { repeatMode, shuffle } = get();
    saveQueueToStorage(updatedQueue, newIndex, repeatMode, shuffle);
  },

  toggleShuffle: () => {
    set((state) => {
      const newShuffle = !state.shuffle;
      // Save to AsyncStorage
      const { queue, currentIndex, repeatMode } = get();
      saveQueueToStorage(queue, currentIndex, repeatMode, newShuffle);
      return { shuffle: newShuffle };
    });
  },

  setRepeatMode: () => {
    set((state) => {
      const next =
        state.repeatMode === "off"
          ? "one"
          : state.repeatMode === "one"
          ? "all"
          : "off";
      
      // Save to AsyncStorage
      const { queue, currentIndex, shuffle } = get();
      saveQueueToStorage(queue, currentIndex, next, shuffle);
      
      return { repeatMode: next };
    });
  },

  playNext: () => {
    const { queue, currentIndex, shuffle, repeatMode } = get();
    if (queue.length === 0) return null;

    // Repeat ONE
    if (repeatMode === "one") {
      return queue[currentIndex];
    }

    let nextIndex = currentIndex;

    if (shuffle) {
      if (queue.length === 1) return queue[currentIndex];

      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = currentIndex + 1;
    }

    // End of queue
    if (nextIndex >= queue.length) {
      if (repeatMode === "all") {
        nextIndex = 0;
      } else {
        return null;
      }
    }

    const nextSong = queue[nextIndex];

    set({
      currentIndex: nextIndex,
      currentSong: nextSong,
      isPlaying: true,
    });

    savePlayerState(queue, nextIndex);
    return nextSong;
  },

  loadQueueFromStorage: async () => {
    const storedQueue = await loadQueueFromStorage();
    if (storedQueue && storedQueue.queue.length > 0) {
      set({
        queue: storedQueue.queue,
        currentIndex: storedQueue.currentIndex,
        currentSong: storedQueue.queue[storedQueue.currentIndex] || null,
        repeatMode: storedQueue.repeatMode,
        shuffle: storedQueue.shuffle,
        isPlaying: false, // Don't auto-play on app start
      });
      return true;
    }
    return false;
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    if (currentIndex - 1 < 0) return null;

    const prevIndex = currentIndex - 1;
    const prevSong = queue[prevIndex];

    set({
      currentIndex: prevIndex,
      currentSong: prevSong,
      isPlaying: true,
    });
    savePlayerState(queue, prevIndex);

    return prevSong;
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  moveQueueItemUp: (index) => {
    const { queue, currentIndex } = get();
    if (index <= 0 || index >= queue.length) return;

    const newQueue = [...queue];
    [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];

    const newCurrentIndex = index === currentIndex ? index - 1 : 
                           index - 1 === currentIndex ? index : currentIndex;

    set({
      queue: newQueue,
      currentIndex: newCurrentIndex,
    });
    savePlayerState(newQueue, newCurrentIndex);
  },

  moveQueueItemDown: (index) => {
    const { queue, currentIndex } = get();
    if (index < 0 || index >= queue.length - 1) return;

    const newQueue = [...queue];
    [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];

    const newCurrentIndex = index === currentIndex ? index + 1 : 
                           index + 1 === currentIndex ? index : currentIndex;

    set({
      queue: newQueue,
      currentIndex: newCurrentIndex,
    });
    savePlayerState(newQueue, newCurrentIndex);
  },
}));