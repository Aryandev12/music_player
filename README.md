# MusicApp - Music Streaming Application

This project is a music streaming application built using React Native (Expo) and TypeScript. It integrates with the JioSaavn API to provide real-time music discovery, playback, and queue management.

## Overview

The application focuses on delivering a smooth and consistent playback experience with clean architecture, responsive UI, and synchronized state management across screens.

## Features

### Core Functionality
* Search songs, artists, and albums using JioSaavn API
* Stream audio with playback controls
* Queue management (add, reorder, remove songs)
* Seek bar with real-time position tracking

### Player Experience
* Full-screen music player
* Persistent mini player
* Synchronized playback state across screens
* Background playback support

### UI and Experience
* Light and dark theme support
* Responsive layout for different screen sizes
* Card-based modern UI

### Playback Controls
* Shuffle mode
* Repeat modes (off, one, all)

## Tech Stack

* **Framework:** React Native (Expo)
* **Language:** TypeScript
* **State Management:** Zustand
* **Navigation:** React Navigation v6
* **Audio:** Expo AV (audio playback)
* **Storage:** AsyncStorage / MMKV (optional persistence)

## Project Structure

```text
src/
├── components/
├── screens/
├── store/
├── services/
├── contexts/
├── constants/
└── types/
```

Application Flow

Discover Screen → Select Song → Player Screen
Mini Player remains persistent across navigation

---

Setup Instructions

Install dependencies
npm install

Start development server
npx expo start

Run on Android
npx expo run:android

---

API Integration

Base URL: [https://saavn.sumit.co/](https://saavn.sumit.co/)
No authentication required

---

Architecture

The application follows a layered architecture:

* API Layer: Handles network requests
* Service Layer: Manages audio playback logic
* Store Layer: Global state using Zustand
* UI Layer: Screens and reusable components

---

Technical Decisions

Zustand
Chosen for lightweight state management with minimal boilerplate and good TypeScript support.

Expo AV
Used for audio playback due to ease of integration and reliable background playback support.

React Navigation
Used for screen navigation for better control over navigation flow.

---

Limitations

* No offline playback
* No user authentication
* Limited persistence for queue and preferences

---

Future Improvements

* Favorites and user library
* Song recommendations
* Lyrics integration

---

Build

npx expo run:android

---

Author

Aryan Dev

---

Notes

This project was developed as part of a React Native assignment with a focus on clean architecture, UI consistency, and playback synchronization.
