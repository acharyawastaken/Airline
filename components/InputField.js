// components/InputField.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function InputField({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  style,
}) {
  const { theme } = useThemeContext();

  return (
    <View style={style}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
});
