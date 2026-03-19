import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../store/playerStore";
import { pauseSong, resumeSong } from "../services/audioService";
import { dimensions } from "../constants/dimensions";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "./Icon";

export default function MiniPlayer() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = theme.colors;

  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Player" as never)}
      activeOpacity={0.9}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: colors.surfaceElevated,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: dimensions.spacing.md,
        paddingBottom: dimensions.spacing.sm,
      }}
    >
      <View style={{
        width: 56,
        height: 56,
        borderRadius: dimensions.borderRadius.small,
        backgroundColor: colors.surface,
        justifyContent: "center",
        alignItems: "center",
        marginRight: dimensions.spacing.md,
      }}>
        <Icon name="play" size={24} color={colors.textSecondary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text 
          style={{ 
            color: colors.text, 
            fontWeight: "600",
            fontSize: dimensions.fontSize.sm,
            marginBottom: 2,
          }} 
          numberOfLines={1}
        >
          {currentSong.name}
        </Text>
        <Text 
          style={{ 
            color: colors.textSecondary, 
            fontSize: dimensions.fontSize.xs 
          }} 
          numberOfLines={1}
        >
          {currentSong.primaryArtists}
        </Text>
      </View>

      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();

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
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: dimensions.spacing.md,
        }}
      >
        <Icon name={isPlaying ? "pause" : "play"} size={20} color={colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}