// screens/ProfileAndSettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import userData from '../data/user.json';

export default function ProfileAndSettingsScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [notifications, setNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Auth'); // mock logout
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Profile & settings
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        Manage your account and preferences.
      </Text>

      {/* Profile card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: theme.colors.text },
          ]}
        >
          {userData.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
          }}
        >
          {userData.email}
        </Text>
        <Text
          style={{
            fontSize: 13,
            marginTop: 4,
            color: theme.colors.textSecondary,
          }}
        >
          {userData.phone}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 10,
            color: theme.colors.textSecondary,
          }}
        >
          Frequent flyer ID: {userData.frequentFlyerId}
        </Text>
      </View>

      {/* Appearance */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Appearance
        </Text>
        <View style={styles.rowBetween}>
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.textSecondary,
            }}
          >
            Theme
          </Text>
          <ThemeToggle />
        </View>
      </View>

      {/* Notifications */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Notifications
        </Text>
        <RowSwitch
          label="Push notifications"
          value={notifications}
          onValueChange={setNotifications}
          theme={theme}
        />
        <RowSwitch
          label="Promotional emails"
          value={promoEmails}
          onValueChange={setPromoEmails}
          theme={theme}
        />
      </View>

      {/* Account */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Account
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              marginTop: 10,
              color: theme.colors.accent,
            }}
          >
            Edit profile (mock)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              fontSize: 13,
              marginTop: 16,
              color: theme.colors.danger,
              fontWeight: '600',
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function RowSwitch({ label, value, onValueChange, theme }) {
  return (
    <View style={styles.rowBetween}>
      <Text
        style={{
          fontSize: 13,
          color: theme.colors.textSecondary,
        }}
      >
        {label}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 4 },
  card: {
    marginTop: 16,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  name: { fontSize: 18, fontWeight: '700' },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
