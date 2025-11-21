// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // mock login then go to main app
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome back ✈️
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          Sign in to manage your trips and book new flights.
        </Text>

        <InputField
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ marginTop: 24 }}
        />
        <InputField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ marginTop: 12 }}
        />

        <Text
          style={{
            marginTop: 8,
            fontSize: 12,
            textAlign: 'right',
            color: theme.colors.accent,
          }}
        >
          Forgot password?
        </Text>

        <PrimaryButton title="Login" onPress={handleLogin} style={{ marginTop: 18 }} />

        <PrimaryButton
          title="Continue as Guest"
          onPress={() => navigation.replace('Main')}
          style={{
            backgroundColor: theme.colors.card,
            marginTop: 4,
          }}
        />

        <View style={styles.footerRow}>
          <Text
            style={{ fontSize: 13, color: theme.colors.textSecondary }}
          >
            New here?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 4,
                color: theme.colors.accent,
              }}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
