export interface DownloadUrl {
  quality: string;
  link?: string;
  url?: string;
}

export interface Image {
  quality: string;
  url?: string;
  link?: string;
}

export interface Song {
  id: string;
  name: string;
  primaryArtists: string;
  album?: string;
  year?: string;
  duration?: number;
  downloadUrl?: DownloadUrl[];
  image?: Image[];
  url?: string;
}

export interface PlayerState {
  queue: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  shuffle: boolean;
  repeatMode: "off" | "one" | "all";

  playSongNow: (song: Song) => void;
  setQueueFromListAndPlay: (songs: Song[], index: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  moveQueueItemUp: (index: number) => void;
  moveQueueItemDown: (index: number) => void;
  playNext: () => Song | null;
  playPrevious: () => Song | null;
  loadQueueFromStorage: () => Promise<boolean>;

  play: () => void;
  pause: () => void;

  toggleShuffle: () => void;
  setRepeatMode: () => void;
}