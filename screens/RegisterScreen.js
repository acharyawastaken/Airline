// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [checked, setChecked] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Create your account
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        It only takes a minute to get started.
      </Text>

      <InputField label="Full name" placeholder="Tanishq Jain" style={{ marginTop: 20 }} />
      <InputField
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        style={{ marginTop: 12 }}
      />
      <InputField
        label="Phone"
        placeholder="+91 9876543210"
        keyboardType="phone-pad"
        style={{ marginTop: 12 }}
      />
      <InputField
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        style={{ marginTop: 12 }}
      />
      <InputField
        label="Confirm Password"
        placeholder="••••••••"
        secureTextEntry
        style={{ marginTop: 12 }}
      />

      <TouchableOpacity
        onPress={() => setChecked(!checked)}
        style={styles.checkboxRow}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: theme.colors.border,
              backgroundColor: checked
                ? theme.colors.primary
                : 'transparent',
            },
          ]}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          I agree to the Terms & Conditions and Privacy Policy.
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title="Create account"
        onPress={() => navigation.replace('Main')}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={{
            fontSize: 13,
            textAlign: 'center',
            marginTop: 12,
            color: theme.colors.accent,
          }}
        >
          Back to login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
  },
});
