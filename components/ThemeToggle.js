// components/ThemeToggle.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../theme/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={18}
        color={theme.colors.accent}
      />
      <Text
        style={[
          styles.text,
          { color: theme.colors.textSecondary },
        ]}
      >
        {isDark ? 'Light mode' : 'Dark mode'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 12,
  },
});
