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
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 100,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: dimensions.spacing.md,
        paddingBottom: dimensions.spacing.md,
        paddingTop: dimensions.spacing.sm,
        minHeight: 60,
      }}>
        {/* Left Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {showBackButton && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: dimensions.spacing.sm,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name="arrow-left" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          
          {showMenuButton && (
            <TouchableOpacity
              onPress={onMenuPress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: dimensions.spacing.sm,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name="menu" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          
          <Text style={{
            fontSize: dimensions.fontSize.xl,
            fontWeight: '700',
            color: colors.text,
            flex: 1,
          }}>
            {title}
          </Text>
        </View>

        {/* Right Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: dimensions.spacing.sm }}>
          {showThemeToggle && (
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name={isDark ? 'sun' : 'moon'} size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          
          {showNotificationButton && (
            <TouchableOpacity
              onPress={onNotificationPress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name="bell" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          
          {showSettingsButton && (
            <TouchableOpacity
              onPress={onSettingsPress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name="settings" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
          
          {showProfileButton && (
            <TouchableOpacity
              onPress={onProfilePress}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Icon name="user" size={18} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
