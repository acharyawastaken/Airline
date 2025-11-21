// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function Header({ title, subtitle, right }) {
  const { theme } = useThemeContext();

  return (
    <View style={styles.wrapper}>
      <View>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
});
