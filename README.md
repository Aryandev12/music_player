# 🎵 Music Player

A modern, feature-rich music streaming app built with React Native and TypeScript, using the JioSaavn API for music discovery and playback.

##  Features

### Core Features
- ** Music Streaming**: Stream songs from JioSaavn API
- ** Search**: Search for songs, artists, albums
- ** Queue Management**: Add, reorder, remove songs from queue
- ** Player Controls**: Play, pause, next, previous, seek
- **Shuffle & Repeat**: Multiple playback modes
- **Dark/Light Theme**: Beautiful theme switching
- **Responsive Design**: Optimized for all screen sizes

### Advanced Features
- ** Professional UI**: Custom SVG icons, smooth animations
- ** Perfect Sync**: MiniPlayer and PlayerScreen stay in sync
- **  Smart Navigation**: Songs resume when switching between screens
- **  Queue Persistence**: Queue saved locally (coming soon)
- ** Background Playback**: Play music while app is minimized (configured)

##  Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd music-player
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Run on device/simulator**
```bash
# For iOS
npm run ios

# For Android
npm run android

# For Expo Go (scan QR code)
npx expo start
```

### Environment Setup
No API keys required! The app uses the public JioSaavn API:
```
Base URL: https://saavn.sumit.co/
```

##   Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── CustomHeader.tsx
│   ├── Icon.tsx
│   ├── MiniPlayer.tsx
│   └── SeekBar.tsx
├── constants/           # App constants and themes
│   ├── dimensions.ts
│   └── themes.ts
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── icons/svg/          # SVG icon assets
├── navigation/         # Navigation configuration
├── screens/           # Main app screens
│   ├── HomeScreen.tsx
│   ├── PlayerScreen.tsx
│   └── QueueScreen.tsx
├── services/          # API and audio services
│   └── audioService.ts
├── store/             # State management
│   └── playerStore.ts
└── types/             # TypeScript type definitions
```

### State Management (Zustand)
```typescript
// Centralized player state
interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  position: number;
  duration: number;
  repeatMode: 'off' | 'all' | 'one';
  shuffle: boolean;
}
```

### Component Architecture

#### **Data Flow**
1. **API Layer** → JioSaavn API integration
2. **Service Layer** → Audio playback management
3. **Store Layer** → Zustand state management
4. **Component Layer** → React components
5. **UI Layer** → Theme-aware presentation

#### **Key Components**

**MiniPlayer**
- Persistent bottom bar
- Syncs with PlayerScreen
- Quick playback controls

**PlayerScreen**
- Full-featured player interface
- Queue management
- Advanced controls

**HomeScreen**
- Search and discovery
- Song list with pagination
- Add to queue functionality

**Icon System**
- Centralized SVG icon management
- Theme-aware coloring
- Consistent sizing

##   Navigation Flow

```
HomeScreen (Main)
    ↓ (Song Selection)
PlayerScreen (Full Player)
    ↓ (Back)
HomeScreen
     (MiniPlayer always visible when song playing)
```

##  UI/UX Design

### Theme System
- **Light Theme**: Clean, modern interface
- **Dark Theme**: Easy on the eyes
- **Dynamic Theming**: Smooth transitions
- **Consistent Colors**: Design system approach

### Design Principles
- **Professional Icons**: Custom SVG icon system
- **Proper Boundaries**: Clear visual separation
- **Smooth Animations**: Micro-interactions
- **Responsive Layout**: Works on all devices

##  Trade-offs Document

### Technical Decisions

#### **State Management: Zustand vs Redux**
**Choice**: Zustand
**Why**: 
- Simpler API for this use case
- Less boilerplate
- Better TypeScript support
- Easier to debug

**Trade-off**: Less ecosystem support compared to Redux

#### **Navigation: React Navigation vs Expo Router**
**Choice**: React Navigation v6
**Why**:
- Assignment requirement
- More mature ecosystem
- Better control over navigation
- Wider community support

**Trade-off**: More configuration required

#### **Icon System: SVG vs Image Assets**
**Choice**: Custom SVG components
**Why**:
- Scalable at any size
- Theme-aware coloring
- Smaller bundle size
- Professional appearance

**Trade-off**: More initial setup time

#### **Audio: Expo AV vs React Native Sound**
**Choice**: Expo AV
**Why**:
- Expo ecosystem compatibility
- Better background playback support
- Easier configuration
- Cross-platform consistency

**Trade-off**: Less fine-grained control

### Performance Considerations

#### **Optimizations Made**
- **FlatList**: Virtualized lists for large song collections
- **Image Caching**: Efficient image loading
- **State Updates**: Optimized re-renders
- **Memory Management**: Proper cleanup

#### **Potential Issues**
- **Large Queues**: Memory usage with extensive queues
- **Image Loading**: Network dependency for album art
- **Background Playback**: Battery consumption

### Architecture Trade-offs

#### **Component Structure**
**Pros**:
- Reusable components
- Clear separation of concerns
- Easy testing
- Maintainable codebase

**Cons**:
- More files to manage
- Initial complexity
- Learning curve

#### **API Integration**
**Pros**:
- Direct API integration
- Real-time data
- No mock data limitations

**Cons**:
- Network dependency
- Rate limiting concerns
- API changes impact

## 🐛 Known Issues & Solutions

### Current Limitations
1. **Queue Persistence**: Not fully implemented yet
2. **Offline Mode**: No offline playback
3. **Download Feature**: Removed (was bonus requirement)

### Solutions in Progress
1. **AsyncStorage Integration**: For queue persistence
2. **Background Mode**: Proper configuration
3. **Error Handling**: Enhanced error boundaries

##  Future Enhancements

### Planned Features
- [ ] Offline playback with downloaded songs
- [ ] Playlist creation and management
- [ ] User authentication and favorites
- [ ] Lyrics display
- [ ] Social sharing
- [ ] Equalizer settings

### Performance Improvements
- [ ] Image preloading
- [ ] Audio buffering optimization
- [ ] Memory usage optimization
- [ ] Startup time reduction

##   Build & Deployment

### Development Build
```bash
# Development
npx expo start

# Production Build
npx expo build:android
npx expo build:ios
```

### APK Generation
```bash
# Generate APK
npx expo build:android --type apk
```

##   Testing

### Manual Testing Checklist
- [ ] Song search functionality
- [ ] Playback controls
- [ ] Queue management
- [ ] Theme switching
- [ ] Navigation flow
- [ ] Background playback
- [ ] MiniPlayer sync

### Automated Testing (Future)
- [ ] Unit tests for utilities
- [ ] Component testing
- [ ] Integration tests
- [ ] E2E testing




**Built with  using React Native, TypeScript, and Expo**
