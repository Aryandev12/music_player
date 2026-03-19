import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../store/playerStore";
import SeekBar from "../components/SeekBar";
import {
  setOnPlaybackStatusUpdate,
  seekTo,
  playSong,
  pauseSong,
  resumeSong,
} from "../services/audioService";
import { dimensions } from "../constants/dimensions";
import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "../components/Icon";

export default function PlayerScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme.colors;
  const song = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const playNext = usePlayerStore((state) => state.playNext);
  const playPrevious = usePlayerStore((state) => state.playPrevious);
  const removeFromQueue = usePlayerStore((state) => state.removeFromQueue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const queue = usePlayerStore((state) => state.queue);
  const repeatMode = usePlayerStore((state) => state.repeatMode);
  const shuffle = usePlayerStore((state) => state.shuffle);
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle);
  const setRepeatMode = usePlayerStore((state) => state.setRepeatMode);
  const moveQueueItemUp = usePlayerStore((state) => state.moveQueueItemUp);
  const moveQueueItemDown = usePlayerStore((state) => state.moveQueueItemDown);

  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      setPosition(status.positionMillis);
      setDuration(status.durationMillis ?? 0);

      if (status.didJustFinish) {
        playNext();
      }
    });
  }, []);

  useEffect(() => {
    if (!song) return;

    const audioObj = song.downloadUrl?.find(
      (d: any) => d.quality === "320kbps"
    );

    const audioUrl = audioObj?.link || audioObj?.url;

    if (!audioUrl) return;

    // Always play the song when it changes (for auto-play next)
    playSong(audioUrl, song);
  }, [song?.id]); // Only trigger when song ID changes

  if (!song) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight || 40
      }}>
        <Text style={{ color: colors.textSecondary, fontSize: dimensions.fontSize.md }}>
          No song selected
        </Text>
      </View>
    );
  }

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: colors.background,
      paddingTop: StatusBar.currentHeight || 40 
    }}>
      {/* Custom Header */}
      <CustomHeader
        title="Now Playing"
        showBackButton={true}
        showSettingsButton={true}
        onBackPress={() => navigation.goBack?.()}
        onSettingsPress={() => console.log('Settings pressed')}
      />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: dimensions.spacing.lg,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Album Art */}
        <View style={{
          alignItems: "center",
          marginBottom: dimensions.spacing.xl,
        }}>
          <View style={{
            width: 280,
            height: 280,
            borderRadius: dimensions.borderRadius.large,
            backgroundColor: colors.surface,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
            overflow: 'hidden',
          }}>
            {song.image?.[2]?.url ? (
              <Image 
                source={{ uri: song.image[2].url }} 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  borderRadius: dimensions.borderRadius.large,
                }}
                resizeMode="cover"
              />
            ) : (
              <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: dimensions.borderRadius.large,
              }}>
                <Icon name="play" size={60} color={colors.background} />
              </View>
            )}
          </View>
        </View>

        {/* Song Info */}
        <View style={{ 
          alignItems: "center", 
          marginBottom: dimensions.spacing.xl 
        }}>
          <Text style={{ 
            fontSize: dimensions.fontSize.xxl, 
            fontWeight: "700", 
            color: colors.text,
            textAlign: "center",
            marginBottom: dimensions.spacing.sm,
          }}>
            {song.name || "Unknown Song"}
          </Text>
          <Text style={{ 
            fontSize: dimensions.fontSize.lg, 
            color: colors.textSecondary,
            textAlign: "center",
          }}>
            {song.artists?.primary?.[0]?.name || "Unknown Artist"}
          </Text>
        </View>

        {/* Seek Bar */}
        <View style={{ marginBottom: dimensions.spacing.xl }}>
          <SeekBar 
            position={position} 
            duration={duration} 
            onSeek={seekTo} 
          />
        </View>

        {/* Playback Controls */}
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: dimensions.spacing.xl,
        }}>
          <TouchableOpacity 
            onPress={toggleShuffle}
            style={{
              marginRight: dimensions.spacing.lg,
            }}
          >
            <Icon 
              name="shuffle" 
              size={24} 
              color={shuffle ? colors.primary : colors.textSecondary} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              playPrevious();
            }}
            style={{
              backgroundColor: colors.surface,
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              marginRight: dimensions.spacing.lg,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Icon name="previous" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (isPlaying) {
                pause();
                pauseSong();
              } else {
                play();
                resumeSong();
              }
            }}
            style={{
              backgroundColor: colors.primary,
              width: 72,
              height: 72,
              borderRadius: 36,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={32} color={colors.background} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              playNext();
            }}
            style={{
              backgroundColor: colors.surface,
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: dimensions.spacing.lg,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Icon name="next" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              const modes = ["off", "all", "one"];
              const currentIndex = modes.indexOf(repeatMode);
              const nextIndex = (currentIndex + 1) % modes.length;
              setRepeatMode(modes[nextIndex] as "off" | "all" | "one");
            }}
            style={{
              marginLeft: dimensions.spacing.lg,
            }}
          >
            <Icon 
              name={repeatMode === "one" ? "repeat-one" : "repeat"} 
              size={24} 
              color={repeatMode !== "off" ? colors.primary : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Queue Section - Fixed without nested FlatList */}
        <View style={{
          backgroundColor: colors.surface,
          borderRadius: dimensions.borderRadius.medium,
          padding: dimensions.spacing.md,
          marginBottom: dimensions.spacing.lg,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          maxHeight: 300,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: dimensions.spacing.md,
          }}>
            <Text style={{ 
              fontWeight: "600", 
              color: colors.text,
              fontSize: dimensions.fontSize.md 
            }}>
              Queue ({queue.length})
            </Text>
            {queue.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  removeFromQueue(currentIndex);
                }}
                style={{
                  backgroundColor: colors.error + '20',
                  paddingHorizontal: dimensions.spacing.sm,
                  paddingVertical: dimensions.spacing.xs,
                  borderRadius: dimensions.borderRadius.small,
                }}
              >
                <Text style={{ 
                  color: colors.error, 
                  fontWeight: "600",
                  fontSize: dimensions.fontSize.sm 
                }}>
                  Remove Current
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {queue.length === 0 ? (
            <View style={{
              alignItems: 'center',
              paddingVertical: dimensions.spacing.lg,
            }}>
              <Icon name="search" size={40} color={colors.textSecondary} />
              <Text style={{ 
                color: colors.textSecondary,
                fontSize: dimensions.fontSize.md,
                marginTop: dimensions.spacing.sm,
                textAlign: 'center',
              }}>
                No songs in queue. Add songs from the home screen.
              </Text>
            </View>
          ) : (
            <ScrollView 
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={false}
              style={{ maxHeight: 250 }}
            >
              {queue.map((item, index) => (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  onPress={() => {
                    // Play this song
                    const audioObj = item.downloadUrl?.find(
                      (d: any) => d.quality === "320kbps"
                    );
                    const audioUrl = audioObj?.link || audioObj?.url;
                    if (audioUrl) {
                      playSong(audioUrl, item);
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: dimensions.spacing.sm,
                    paddingHorizontal: dimensions.spacing.sm,
                    borderRadius: dimensions.borderRadius.small,
                    backgroundColor: index === currentIndex ? colors.primary + '20' : 'transparent',
                    marginBottom: index < queue.length - 1 ? dimensions.spacing.xs : 0,
                  }}
                >
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: index === currentIndex ? colors.primary : colors.surface,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: dimensions.spacing.sm,
                  }}>
                    {index === currentIndex && isPlaying ? (
                      <Icon name="pause" size={12} color={colors.background} />
                    ) : (
                      <Text style={{
                        fontSize: dimensions.fontSize.sm,
                        fontWeight: "600",
                        color: index === currentIndex ? colors.background : colors.textSecondary,
                      }}>
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: index === currentIndex ? colors.primary : colors.text,
                        fontSize: dimensions.fontSize.sm,
                        fontWeight: index === currentIndex ? "600" : "400",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontSize: dimensions.fontSize.xs,
                        marginTop: 2,
                      }}
                    >
                      {item.artists?.primary?.[0]?.name || "Unknown Artist"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeFromQueue(index)}
                    style={{
                      padding: dimensions.spacing.xs,
                    }}
                  >
                    <Icon name="trash" size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}