import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface SeekBarProps {
  position: number;
  duration: number;
  onSeek: (value: number) => void;
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function SeekBar({
  position,
  duration,
  onSeek,
}: SeekBarProps) {
  return (
    <View style={{ width: "100%", marginVertical: dimensions.spacing.md }}>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration || 1}
        onSlidingComplete={onSeek}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.surface}
        thumbTintColor={colors.primary}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: dimensions.spacing.sm,
        }}
      >
        <Text style={{ 
          color: colors.textSecondary,
          fontSize: dimensions.fontSize.xs 
        }}>
          {formatTime(position)}
        </Text>
        <Text style={{ 
          color: colors.textSecondary,
          fontSize: dimensions.fontSize.xs 
        }}>
          {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
}