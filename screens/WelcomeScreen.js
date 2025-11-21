// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function WelcomeScreen({ navigation }) {
  const { theme } = useThemeContext();

  return (
    <LinearGradient
      colors={
        theme.mode === 'dark'
          ? ['#020617', '#0f172a']
          : ['#eff6ff', '#dbeafe']
      }
      style={styles.container}
    >
      <View style={styles.topRow}>
        <ThemeToggle />
      </View>

      <View style={styles.center}>
        <Text
          style={[
            styles.logo,
            { color: theme.colors.text },
          ]}
        >
          FlySmart
        </Text>
        <Text
          style={[
            styles.tagline,
            { color: theme.colors.textSecondary },
          ]}
        >
          Book. Fly. Repeat.
        </Text>

        <View style={styles.card}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text },
            ]}
          >
            Your next adventure
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Discover best deals on flights with a premium booking experience.
          </Text>

          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate('Onboarding')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.secondary,
                { color: theme.colors.accent },
              ]}
            >
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={[
          styles.footer,
          { color: theme.colors.textSecondary },
        ]}
      >
        ✈️ Built with Expo & React Native
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  center: { flex: 1, justifyContent: 'center' },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    marginTop: 32,
    borderRadius: 28,
    padding: 20,
    backgroundColor: 'rgba(15,23,42,0.72)',
    backdropFilter: 'blur(16px)', // ignored on RN but fine
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 13, marginBottom: 16 },
  secondary: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  footer: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
  },
});
