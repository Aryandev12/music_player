export interface Theme {
  name: 'dark' | 'light';
  colors: {
    // Primary Colors
    primary: string;
    primaryDark: string;
    primaryLight: string;
    
    // Background Colors
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    
    // Surface Colors
    surface: string;
    surfaceElevated: string;
    surfaceHover: string;
    surfacePressed: string;
    
    // Text Colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textMuted: string;
    textDisabled: string;
    
    // Border and Divider Colors
    border: string;
    borderLight: string;
    divider: string;
    
    // Status Colors
    error: string;
    errorDark: string;
    warning: string;
    warningDark: string;
    success: string;
    successDark: string;
    info: string;
    infoDark: string;
    
    // Accent Colors
    accent: string;
    accentSecondary: string;
    accentTertiary: string;
    
    // Shadow and Overlay Colors
    shadow: string;
    overlay: string;
    overlayLight: string;
  };
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#B572E8',
    primaryDark: '#9E5AD6',
    primaryLight: '#B49EF4',

    background: '#0F1222',
    backgroundSecondary: '#1A1F3A',
    backgroundTertiary: '#242B4A',

    surface: '#1A1F3A',
    surfaceElevated: '#242B4A',
    surfaceHover: '#2E3560',
    surfacePressed: '#3A4170',

    text: '#F2F7FF',
    textSecondary: '#B2C9FF',
    textTertiary: '#9AA8D6',
    textMuted: '#6C7AA8',
    textDisabled: '#4A5678',

    border: '#2E3560',
    borderLight: '#3A4170',
    divider: '#2E3560',

    error: '#FF4D6D',
    errorDark: '#D93654',
    warning: '#FFA500',
    warningDark: '#CC8400',
    success: '#4CAF50',
    successDark: '#3B8B3B',
    info: '#5A8DEE',
    infoDark: '#3F6FD1',

    accent: '#B572E8',
    accentSecondary: '#B49EF4',
    accentTertiary: '#B2C9FF',

    shadow: 'rgba(0,0,0,0.3)',
    overlay: 'rgba(0,0,0,0.5)',
    overlayLight: 'rgba(0,0,0,0.2)',
  },
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    // Primary
    primary: '#B572E8',
    primaryDark: '#9E5AD6',
    primaryLight: '#D2E0FF',

    // Background
    background: '#F2F7FF',
    backgroundSecondary: '#D2E0FF',
    backgroundTertiary: '#B2C9FF',

    // Surface
    surface: '#FFFFFF',
    surfaceElevated: '#F2F7FF',
    surfaceHover: '#D2E0FF',
    surfacePressed: '#B2C9FF',

    // Text
    text: '#1A1A2E',
    textSecondary: '#4A4A68',
    textTertiary: '#6B6B8A',
    textMuted: '#9A9AB0',
    textDisabled: '#C0C0D0',

    // Border
    border: '#D2E0FF',
    borderLight: '#E6ECFF',
    divider: '#D2E0FF',

    // Status
    error: '#FF4D6D',
    errorDark: '#D93654',
    warning: '#FFA500',
    warningDark: '#CC8400',
    success: '#4CAF50',
    successDark: '#3B8B3B',
    info: '#5A8DEE',
    infoDark: '#3F6FD1',

    // Accent (IMPORTANT for UI feel)
    accent: '#B49EF4',
    accentSecondary: '#B2C9FF',
    accentTertiary: '#D2E0FF',

    // Shadow
    shadow: 'rgba(0,0,0,0.08)',
    overlay: 'rgba(0,0,0,0.2)',
    overlayLight: 'rgba(0,0,0,0.05)',
  },
};
export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
