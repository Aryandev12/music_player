import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dimensions } from '../constants/dimensions';
import { useTheme } from '../contexts/ThemeContext';
import Icon from './Icon';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showProfileButton?: boolean;
  showNotificationButton?: boolean;
  showSettingsButton?: boolean;
  showThemeToggle?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export default function CustomHeader({
  title,
  showBackButton = false,
  showMenuButton = false,
  showProfileButton = false,
  showNotificationButton = false,
  showSettingsButton = false,
  showThemeToggle = false,
  onBackPress,
  onMenuPress,
  onProfilePress,
  onNotificationPress,
  onSettingsPress,
}: CustomHeaderProps) {
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const colors = theme.colors;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{
      paddingTop: dimensions.spacing.sm,
      paddingBottom: dimensions.spacing.md,
      paddingHorizontal: dimensions.spacing.md,
      backgroundColor: colors.background,
    }}>

      {/* Top Row */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Left */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {showBackButton && (
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-left" size={22} color={colors.text} />
            </TouchableOpacity>
          )}

          {showMenuButton && (
            <TouchableOpacity onPress={onMenuPress}>
              <Icon name="menu" size={22} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Title */}
        <Text style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: dimensions.fontSize.xl,
          fontWeight: '800',
          color: colors.text,
        }}>
          {title}
        </Text>

        {/* Right */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {showThemeToggle && (
            <TouchableOpacity onPress={toggleTheme}>
              <Icon name={isDark ? 'sun' : 'moon'} size={20} color={colors.primary} />
            </TouchableOpacity>
          )}

          {showNotificationButton && (
            <TouchableOpacity onPress={onNotificationPress}>
              <Icon name="bell" size={20} color={colors.text} />
            </TouchableOpacity>
          )}

          {showSettingsButton && (
            <TouchableOpacity onPress={onSettingsPress}>
              <Icon name="settings" size={20} color={colors.text} />
            </TouchableOpacity>
          )}

          {showProfileButton && (
            <TouchableOpacity
              onPress={onProfilePress}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="user" size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Optional Subtitle / Divider */}
      <View style={{
        height: 1,
        backgroundColor: colors.border,
        marginTop: 10,
        opacity: 0.5,
      }} />

    </View>
  );
}